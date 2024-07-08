from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)  # Crear el objeto app de la clase Flask

# CORS(app)  # Modulo CORS es para que me permita acceder desde el frontend al backend
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"], "allow_headers": "*"}})


# Configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sportmas:proyectosportmas@sportmas.mysql.pythonanywhere-services.com/sportmas$default'
# URI de la BBDD driver de la BD user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # None
db = SQLAlchemy(app)  # Crea el objeto db de la clase SQLAlchemy
ma = Marshmallow(app)  # Crea el objeto ma de la clase Marshmallow

# Defino la tabla
class Cliente(db.Model):  # La clase Cliente hereda de db.Model
    id = db.Column(db.Integer, primary_key=True)  # Define los campos de la tabla
    nombre = db.Column(db.String(50), nullable=False)
    mail = db.Column(db.String(100), nullable=False)
    tel = db.Column(db.String(15), nullable=False)
    genero = db.Column(db.String(30), nullable=False)
    servicios = db.Column(db.String(400))
    plan = db.Column(db.String(50), nullable=False)
    consulta = db.Column(db.String(400))
    aptofisico = db.Column(db.String(10), nullable=False)
    
    def __init__(self, nombre, mail, tel, genero, servicios, plan, consulta, aptofisico):
        self.nombre = nombre
        self.mail = mail
        self.tel = tel
        self.genero = genero
        self.servicios = servicios
        self.plan = plan
        self.consulta = consulta
        self.aptofisico = aptofisico

# Si hay que crear más tablas, se hace aquí
with app.app_context():
    db.create_all()  # Aquí crea todas las tablas

class ClienteSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'mail', 'tel', 'genero', 'servicios', 'plan', 'consulta', 'aptofisico')

cliente_schema = ClienteSchema()  # El objeto cliente_schema es para traer un cliente
clientes_schema = ClienteSchema(many=True)  # El objeto clientes_schema es para traer múltiples registros de cliente

# Crea los endpoints o rutas (JSON)
@app.route('/clientes', methods=['GET'])
def get_clientes():
    all_clientes = Cliente.query.all()  # El método query.all() lo hereda de db.Model
    result = clientes_schema.dump(all_clientes)  # El método dump() lo hereda de ma.schema y trae todos los registros de la tabla
    return jsonify(result)  # Retorna un JSON de todos los registros de la tabla

@app.route('/clientes/<id>', methods=['GET'])
def get_cliente(id):
    cliente = Cliente.query.get(id)
    return cliente_schema.jsonify(cliente)  # Retorna el JSON de un cliente recibido como parámetro

@app.route('/clientes/<id>', methods=['DELETE'])
def delete_cliente(id):
    cliente = Cliente.query.get(id)
    db.session.delete(cliente)
    db.session.commit()
    return cliente_schema.jsonify(cliente)  # Me devuelve un JSON con el registro eliminado

@app.route('/clientes', methods=['POST'])  # Crea ruta o endpoint
def create_cliente():
    nombre = request.json['nombre']
    mail = request.json['mail']
    tel = request.json['tel']
    genero = request.json['genero']
    servicios = request.json['servicios']
    # Convertir la lista de servicios en una cadena separada por comas
    servicios_str = ', '.join(servicios)
    plan = request.json['plan']
    consulta = request.json['consulta']
    aptofisico = request.json['aptofisico']

    # Crear una nueva instancia de Cliente con servicios_str
    new_cliente = Cliente(
        nombre=nombre,
        mail=mail,
        tel=tel,
        genero=genero,
        servicios=servicios_str,  # Usar la cadena convertida aquí
        plan=plan,
        consulta=consulta,
        aptofisico=aptofisico
    )
    db.session.add(new_cliente)
    db.session.commit()
    return cliente_schema.jsonify(new_cliente)

@app.route('/clientes/<id>', methods=['PUT'])
def update_cliente(id):
    cliente = Cliente.query.get(id)
    cliente.nombre = request.json['nombre']
    cliente.mail = request.json['mail']
    cliente.tel = request.json['tel']
    cliente.genero = request.json['genero']
    cliente.servicios = request.json['servicios']
    cliente.plan = request.json['plan']
    cliente.consulta = request.json['consulta']
    cliente.aptofisico = request.json['aptofisico']
    db.session.commit()
    return cliente_schema.jsonify(cliente)

@app.route('/')
def hello_world():
    return 'Bienvenido al backend de Sport +'

# Programa principal *******************************
if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Ejecuta el servidor Flask en el puerto 5000
    print("Running on http://127.0.0.1:5000/")
