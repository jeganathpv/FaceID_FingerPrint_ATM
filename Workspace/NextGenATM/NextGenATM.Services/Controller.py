from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin

#Import Models,Services
from Models import *
from Services import * 


app = Flask(__name__)
CORS(app, support_credentials = True)
api = Api(app)

class LoginController(Resource):
    @app.route('/auth',methods = ['POST'])
    @cross_origin(support_credentials = True)
    def userLogin():
        json_data = request.get_json(force = True)
        username = str(json_data['username'])
        password = str(json_data['password'])
        userObj = UserObject(username,password)
        return jsonify({'Status':str(LoginUser.validateUser(userObj))})

class BankController(Resource):
    @app.route('/bank/getdetails',methods = ['GET'])
    @cross_origin(support_credentials = True)
    def getBankDetails():
        return jsonify({"BankDetails":BankService.getBankDetails()})

class AccountController(Resource):
    @app.route('/account/generatecustid',methods = ['POST'])
    @cross_origin(support_credentials = True)
    def generateCustId():
        json_data = request.get_json(force = True)
        branchCode = json_data['branchCode']
        accountNo = json_data['accountNo']
        name = json_data['name']
        balance = json_data['balance']
        custObj = CustomerObject("",branchCode,accountNo,name,balance)
        custId = AccountService.generateCustomerID(custObj)
        return jsonify({'Status':'true','CustomerID':custId})

if __name__ == "__main__":
    api.add_resource(LoginController)
    api.add_resource(BankController)
    app.run(host= '0.0.0.0')