### Exportar/Importar BD de Firestore
#### Antes de empezar
Asegurarse de tener la librería [node-firestore-import-export](https://www.npmjs.com/package/node-firestore-import-export) y la dependencia firebase-admin@5.12.1 instaladas.
`````
npm list -g --depth 0
`````

#### Situarse en la carpeta donde está instalado node-firestore-import-export
````
cd /Users/jespinosa/.npm-global/lib/node_modules/node-firestore-import-export/dist/bin
`````
#### Exportar base de datos
`````
node firestore-export -a firebase-key.json -b /Users/jespinosa/Documents/tfg/src/data/backup.json -p
`````

#### Importar base de datos
`````
node firestore-import -a firebase-key.json -b /Users/jespinosa/Documents/tfg/src/data/backup.json -y
`````
