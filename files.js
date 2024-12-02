import fs from 'node:fs/promises'
class FileManager {
   async writeFile (filename, data){ // märksõna async viitab, et tegu on asünkroonse protsessiga. Failist lugemise ja kirjutamise peab tagastama Promise
       try { // try plokis on tegevused, mille korral viga võib tekkida. Selles plokis käivitub vea korral catch ja programm töötab edasi.
           // andmete panemine JSON-formaati
           data = JSON.stringify(data, null, 2)
           // andmete salvestamine faili
           await fs.writeFile(filename, data) // await viitab tegevusele, mille tulemust oodatakse
       } catch (error){
           console.log('write error => ', error)
       } 
   } 
   
   async readFile(filename){
       try {
           // loeb failist sisu tekstiformaadis
           const fileContent = await fs.readFile(filename, 'utf8')
           // sisu muutmine tekstiformaadist andmeformaadiks
           const fileData = JSON.parse(fileContent)
           return fileData
       } catch(error){
           console.error('read error => ', error)
           return null
       } 
   } 
} 
export const fileManager = new FileManager()