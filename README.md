pour run les serveurs :

back-end : (acceder au dossier back-end ):  flask --app  main --debug run

serveur pour obtenir les willaya et commune (faut se rend dans le dossier du front) : npx json-server --watch src/Data/wilaya_commune.json --port 9000

front-end (faut se rend dans le dossier du front-end) : npm start 
