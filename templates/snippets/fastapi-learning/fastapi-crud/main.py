from fastapi import FastAPI
from fastapi import Request
import json
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
import pandas as pd

app = FastAPI(title="App Demo")
templates = Jinja2Templates(directory="templates")
df = pd.read_csv("programming_languages.csv")
datos = df["language"].to_dict()

@app.get("/")
async def raiz(request: Request):
    sin_codificar = json.dumps(datos)
    json_datos = json.loads(sin_codificar)
    return templates.TemplateResponse("index.html",
                                      {"request":request,
                                       "listado":json_datos})

@app.post("/agregar")
async def agregar(request:Request):
    nuevos_datos={}
    formdata = await request.form()
    i = 1
    for id in datos:
        nuevos_datos[id] = datos[id]
        i+=1
    datos[str(i)] = formdata["newlanguage"]
    print("add:", formdata["newlanguage"])
    sin_codificar = json.dumps(datos)
    json.loads(sin_codificar)
    return RedirectResponse("/", 303)

@app.get("/eliminar/{id}")
async def eliminar(request: Request, id:int):
    print("delete:", datos[id])
    del datos[id]
    return RedirectResponse("/", 303)

