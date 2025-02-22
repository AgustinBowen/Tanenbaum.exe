from flask import Blueprint, jsonify, Response, request
from sqlalchemy import func
from unidecode import unidecode
from app.database import db
from app.models import *

main = Blueprint("main", __name__)

@main.route("/", methods=["GET"])
def index():
    examenes = Examen.query.all()
    examenes_data = [examen.to_json() for examen in examenes]
    return jsonify(examenes_data)

@main.route("/api/materias", methods=["GET"])
def buscar_materias():
    search = request.args.get("search", "").strip().lower()
    if not search:
        return jsonify([])

    search_normalizado = unidecode(search)

    materias = Materia.query.all()
    
    resultados = [
        m.to_json() 
        for m in materias 
        if search_normalizado in unidecode(m.nombre.lower())
    ]

    return jsonify(resultados)

@main.route("/api/materia/id/<string:materia_nombre>", methods=["GET"])
def obtener_materia_por_nombre(materia_nombre):
    materia_nombre = materia_nombre.replace("-", " ")

    materia = Materia.query.filter(
        func.unaccent(func.lower(Materia.nombre)) == func.unaccent(materia_nombre.lower())
    ).first()

    if materia:
        return jsonify({"id": materia.id, "nombre": materia.nombre})
    else:
        return jsonify({"error": "Materia no encontrada"}), 404

@main.route("/api/materia/examenes/<int:materia_id>", methods=["GET"])
def obtener_examenes(materia_id):
    instancia = request.args.get("instancia")
    
    examenes = []
    resumenes = [] 
    
    if instancia in ["Parcial", "Final"]:     
        examenes = Examen.query.filter_by(materia_id=materia_id, instancia=instancia).all()
    else:
        resumenes = Resumen.query.filter_by(materia_id=materia_id).all()

    if not examenes and not resumenes:
        return jsonify({"error": "No se encontraron exámenes o resúmenes para esta materia"}), 404

    if examenes:
        examenes_data = [
            {
                "id": examen.id,
                "materia": examen.materia_rel.nombre,
                "fecha": examen.fecha.strftime("%Y-%m-%d"),
                "instancia": examen.instancia,
                "archivos": [
                    {
                        "id": archivo.id,
                        "filename": archivo.filename,
                        "tipo": archivo.tipo,
                        "descripcion" : archivo.descripcion,
                        "archivo_url" : archivo.file_url
                    } for archivo in examen.archivos
                ]
            }
            for examen in examenes
        ]
        return jsonify(examenes_data)

    resumenes_data = [
        {
            "id": resumen.id,
            "materia": resumen.materia_rel.nombre,
            "archivos": [
                {
                    "id": archivo.id,
                    "filename": archivo.filename,
                    "tipo": archivo.tipo,
                    "archivo_url" : archivo.file_url
                } for archivo in resumen.archivos
            ]
        }
        for resumen in resumenes
    ]
    return jsonify(resumenes_data)

"""@main.route("/api/archivos/<int:archivo_id>", methods=["GET"])
def obtener_archivo(archivo_id):
    archivo = Archivo.query.get(archivo_id)
    if archivo:
        return Response()
    else:
        return jsonify({"error": "Archivo no encontrado"}), 404"""
