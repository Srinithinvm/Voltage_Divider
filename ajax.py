from flask import Flask,render_template,redirect,request,jsonify
import datetime
import sqlite3
app = Flask(__name__)


insertQuery='INSERT INTO datas(r1,r2,vin,vout) VALUES(%s,%s,%s,%s)'
fetchQuery='SELECT * from datas'
deleteQuery="""DELETE from datas where _id = ? """
dbfilename="Frontend_Design.db"


    
@app.route("/")
def forntend_design():
    conn=sqlite3.connect(dbfilename)
    cursor=conn.cursor()
    cursor.execute(fetchQuery)
    receivedData=cursor.fetchall()
    return render_template("layout.html",Result=receivedData)


def Createtable():
    Createtablequery="""CREATE TABLE IF NOT EXISTS "datas" (
                "R1" TEXT NOT NULL,
                "R2" TEXT NOT NULL,
                "Vin" TEXT NOT NULL,
                "Vout" TEXT NOT NULL,
                "_id" INTEGER NOT NULL, PRIMARY KEY("_id" AUTOINCREMENT)
                );
                """
   
    conn=sqlite3.connect(dbfilename)
    cursor=conn.cursor()
    cursor.execute(Createtablequery)
    conn.commit()
    conn.close()


@app.route("/insertdata",methods=['POST'])
def insert():
    R1 = request.form["resistor1"]
    R2= request.form["resistor2"]
    Vin= request.form["vin"]
    Vout= request.form["vout"]
    conn=sqlite3.connect(dbfilename)
    cursor=conn.cursor()
    cursor.execute(insertQuery%(R1,R2,Vin,Vout))
    conn.commit()
    conn.close()
    return "Succesfully file"

@app.route("/deletedata",methods=['POST'])
def delete():
    try:
        ID=request.form["id"]
        conn=sqlite3.connect(dbfilename)
        cursor=conn.cursor()
        print("SQL query",deleteQuery)
        cursor.execute(deleteQuery,(ID,))
        conn.commit()
        cursor.close()
        conn.close()
        return "Successfully Deleted"
       
    except Exception as e:
        print("Exception:",str(e))
        return "An error occured",500

@app.route("/refresh")
def refresh():
    conn=sqlite3.connect(dbfilename)
    cursor=conn.cursor()
    cursor.execute(fetchQuery)
    receivedData=cursor.fetchall()
    data=[]
    for rows in receivedData:
        data.append({
        'R1':rows[0],
        'R2':rows[1],
        'Vin':rows[2],
        'Vout':rows[3],
        'Id':rows[4],
        })
        
    return jsonify(data)
    

if __name__ == "__main__":
        
    Createtable()
    app.run(host="0.0.0.0",debug=True);