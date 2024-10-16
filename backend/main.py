

import networkx as nx  

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator

app = FastAPI()

# Configure CORS
origins = ["http://localhost:3000"] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: list
    edges: list

    @validator("nodes", "edges")
    def validate_list(cls, v):
        if not isinstance(v, list):
            raise ValueError("Must be a list")
        return v

@app.post("/pipelines/parse")
async def parse_pipeline(data: PipelineData):
    try:
        num_nodes = len(data.nodes)
        num_edges = len(data.edges)

        
        graph = nx.DiGraph()
        graph.add_nodes_from([node["id"] for node in data.nodes])  
        graph.add_edges_from([(edge["source"], edge["target"]) for edge in data.edges])  

        
        is_dag = nx.is_directed_acyclic_graph(graph)

        return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))