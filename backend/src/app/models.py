from app.database import db
from datetime import datetime

class Materia(db.Model):
    __tablename__ = "materia"

    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(10), unique=True, nullable=False)
    nombre = db.Column(db.String(100), unique=True, nullable=False)

    examenes = db.relationship("Examen", backref="materia_rel", lazy=True)
    resumenes = db.relationship("Resumen", backref="materia_rel", lazy=True)

    def to_json(self):
        return {"id": self.id, "nombre": self.nombre}


class Examen(db.Model):
    __tablename__ = "examen"

    id = db.Column(db.Integer, primary_key=True)
    materia_id = db.Column(db.Integer, db.ForeignKey("materia.id"), nullable=False)
    fecha = db.Column(db.Date, nullable=False, default=datetime.now)
    instancia = db.Column(db.String(20), nullable=False)  
    
    archivos = db.relationship("Archivo", backref="examen_rel", lazy=True)  

    def to_json(self):
        return {
            "id": self.id,
            "materia": self.materia_rel.nombre,  
            "fecha": self.fecha.strftime("%Y-%m-%d"),
            "instancia": self.instancia,
            "archivos": [archivo.to_json() for archivo in self.archivos]  
        }
        
class Resumen(db.Model):
    __tablename__ = "resumen"

    id = db.Column(db.Integer, primary_key=True)
    materia_id = db.Column(db.Integer, db.ForeignKey("materia.id"), nullable=False)
    instancia = db.Column(db.String(20), nullable=False)  
    
    archivos = db.relationship("Archivo", backref="resumen_rel", lazy=True)  

    def to_json(self):
        return {
            "id": self.id,
            "materia": self.materia_rel.nombre,  
            "instancia": self.instancia,
            "archivos": [archivo.to_json() for archivo in self.archivos]  
        }


class Archivo(db.Model):
    __tablename__ = "archivo"

    id = db.Column(db.Integer, primary_key=True)
    examen_id = db.Column(db.Integer, db.ForeignKey("examen.id"), nullable=True) 
    resumen_id = db.Column(db.Integer, db.ForeignKey("resumen.id"), nullable=True)  
    filename = db.Column(db.String(255), nullable=False)  
    tipo = db.Column(db.String(10), nullable=False)  
    data = db.Column(db.LargeBinary, nullable=False)  

    __table_args__ = (
        db.CheckConstraint(
            "(examen_id IS NOT NULL AND resumen_id IS NULL) OR (examen_id IS NULL AND resumen_id IS NOT NULL)",
            name="check_examen_o_resumen"
        ),
    )

    def to_json(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "tipo": self.tipo,
            "examen_id": self.examen_id,
            "resumen_id": self.resumen_id
        }
