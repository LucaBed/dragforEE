import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import {CdkDrag} from '@angular/cdk/drag-drop';
import { Circle, Line, Polygon, Rect, SVG, Element, Polyline, G  as SVGElement, G} from '@svgdotjs/svg.js';
import '@svgdotjs/svg.topoly.js'
import '@svgdotjs/svg.draggable.js';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {







  @ViewChild('svgField') svgField!: ElementRef;

  
  draw: any;
  selectedElement!: SVGElement | G;
  rotation = 0; 
  ingrandimento = 1;
  translation = 0;
  larghezza = 0;
  // zoomOut = 0;
  // zoomIn = 0;
  //draggoPuntoX2 = 0;
  xStretchata = 1;
  quadrato!: SVGElement;
  edistance: any;
  linee!: SVGElement;

  listaRect = [];
  listaSelezionati: SVGElement[] = [];
  uCreato!: SVGElement;
  vb_min_x = 0;
  vb_min_y = 0;
  vb_width = 1540;
  vb_height = 1000;
  gruppoStatico1!: G;
  


  

  constructor(private renderer: Renderer2){}


  ngAfterViewInit(): void {
    
    this.draw = SVG().addTo(this.svgField.nativeElement)
    
    this.draw.viewbox(this.vb_min_x, this.vb_min_y, this.vb_width, this.vb_height)

    console.log("Larghezza svg:", this.draw.node.height.animVal.value)
    console.log("Larghezza svg:", this.draw.node.width.animVal.value)

    const hSVG = this.draw.node.height.animVal.value
    const wSVG = this.draw.node.width.animVal.value

    // Prendo un gruppo statico e lo rendo draggabile

    // @ts-ignore
     this.gruppoStatico1 = SVG("#cmap_nastro_n11-rsx_n11-rdx")
    console.log("Vediamo prova?", this.gruppoStatico1)

    // @ts-ignore
    this.gruppoStatico1.draggable()

    

   

    
    
    // Dimensione della griglia (ad esempio, 50px)
    const gridSize = 50;

// Disegna la griglia con la funzione drawGrid()
    this.drawGrid(this.draw, this.vb_min_x, this.vb_min_y, this.vb_width, this.vb_height, gridSize);


    // evento di selezione dell'elemento
    this.draw.on('dblclick', (e: any)=>{
      
      console.log("Doppio click su: ", e.target)
      this.selectedElement =  SVG(e.target) as SVGElement | G;
      console.log("Tipo el selezionato: ", this.selectedElement)
      this.listaSelezionati.push(this.selectedElement)
      console.log("Lista selezionati: ", this.listaSelezionati)

             
             console.log("Elementi del draw: ", Object.values(this.draw.node.children))
             console.log("Ultimo elemento creato nel draw: ", Object.values(this.draw.node.children).at(-1))
             this.uCreato = Object.values(this.draw.node.children).at(-1) as SVGElement
             console.log("uCreato: ", this.uCreato)


      // parametri iniziali dell'elemento selezionato 
      this.rotation = 0; 
      this.ingrandimento = 1;
      this.translation = 0;
      this.xStretchata = 1;

      if(this.selectedElement instanceof(Line)){
      this.selectedElement.stroke({ color: 'grey'})

      }
      else {
        this.selectedElement.fill("grey")
      }

    })

  
    
  }

  /*
  provaZoom(e: any){
      // console.log(e.deltaY)
      const dir = Math.sign(e.deltaY)
        // console.log(e.deltaY)

      const step = 0.1
        this.zoomIn += dir * step
        console.log(this.zoomIn)
        this.zoomIn = Math.max(0.2, Math.min(5, this.zoomIn))
        let lista = this.draw.children()
        lista.forEach((e: { transform: (arg0: { scale: number; }) => any; })=>{e.transform({scale: this.zoomIn})})
      
  }
*/
 
  //++++++++++++++ Event handlers bottoni oggetti +++++++++++++++++++

  creaRect() {
    var rect  = this.draw.rect(100, 100).attr({ fill: 'rgb(0, 255, 255)' })
    // @ts-ignore
    rect.draggable()

 

    this.quadrato = rect
    // @ts-ignore
    this.listaRect.push(this.quadrato)
    console.log(this.listaRect)
    }

  creaCircle(){
    var circle = this.draw.circle(100).attr({fill: 'rgb(255, 0, 247)'})
    // @ts-ignore
    circle.draggable()
  }

  creaTriangle() {
    var triangle = this.draw.polygon('0,100 50,0 100,100').attr({fill: 'rgb(0, 255, 136)'});
    // @ts-ignore
    triangle.draggable()
    }

  creaLine() {
    var linea = this.draw.line(0, 50, 100, 50);
    linea.stroke({ color: 'rgb(225, 255, 0)', width: 10, linecap: 'round' })
    // @ts-ignore
    linea.draggable()
    }

    creaNastro() {
      const data = {
        labels: [{ "value": "M105", "label_h": 6.5, "label_x": 235.686953917329, "label_y": 13.01340075534199 }],
        arrows: [{
          "x": 0.0, "y": 0.0, "type": 10, "width": 0, "height": 0, "rotation": 0,
          "bind_to": "cato_nastro_m105",
          "path": "229.58695391733,11.51340075534199 231.58695391732886,13.01340075534199 231.58695391732886,12.26340075534199 234.58695391733,12.26340075534199 234.58695391733,10.76340075534199 231.58695391732886,10.76340075534199 231.58695391732886,10.01340075534199 229.58695391733,11.51340075534199"
        }],
        width: 463.5,
        height: 6.02,
        radiusBorder: 0.5,
        radiusBelt: 2.0
      };
  
      // Crea un gruppo per contenere tutti gli elementi del nastro
      const nastroGroup = this.draw.group();
      
      // Calcola il centro del nastro per la rotazione
      const centerX = data.width / 2;
      const centerY = data.height / 2;
      
      // Sposta il gruppo all'origine
      nastroGroup.move(0, 0);
  
      // Aggiunge il rettangolo del nastro al gruppo
      const nastro = this.draw.rect(data.width, data.height)
        .attr({ fill: 'gray', rx: data.radiusBorder, ry: data.radiusBorder });
      nastroGroup.add(nastro);
  
      // Aggiunge le etichette al gruppo
      data.labels.forEach(label => {
        const labelText = this.draw.text(label.value)
          .font({ size: label.label_h })
          .move(label.label_x, label.label_y)
          .fill('black');
        nastroGroup.add(labelText);
      });
  
      // Aggiunge le frecce al gruppo
      data.arrows.forEach(arrow => {
        const points = arrow.path.split(" ").map(pair => pair.split(",").map(Number));
        const polyline = this.draw.polyline(points)
          .fill('none')
          .stroke({ color: 'black', width: 1 });
        nastroGroup.add(polyline);
      });

  
      // Imposta il punto di rotazione al centro del gruppo
      nastroGroup.transform({ origin: [centerX, centerY] });
      
      // Rendi il gruppo draggable
      nastroGroup.draggable();
  
      // Salva il riferimento al gruppo
      this.selectedElement = nastroGroup;
      this.listaSelezionati.push(this.selectedElement)
    }


    creaCassone() {
      const data = {
        "labels": [{"value": "TR1", "label_h": 21.5, "label_x": 0.288426568204045, "label_y": -4.288399227199989}], 
        "arrows": [], 
        "circles": [], 
        "polylines": [], 
        "draw": "M 130.57817350095104,33.659999999911996  L 4.179999999939014,33.659999999911996 M 112.7628401089271,71.05999999990999  L 112.7628401089271,77.330000000242 M 4.179999999939014,96.140000000154  L 4.179999999939014,4.180000000243993 M 0.0,100.32000000039599  L 0.0,0.0 M 4.179999999939014,4.180000000243993  L 25.07999999993899,33.659999999911996 M 4.179999999939014,96.140000000154  L 25.07999999993899,66.65999999991 M 0.0,4.180000000243993  L 112.7628401089271,4.180000000243993 M 112.7628401089271,96.140000000154  L 0.0,96.140000000154 M 0.0,0.0  L 112.7628401089271,0.0 M 112.7628401089271,100.32000000039599  L 0.0,100.32000000039599 M 130.57817350095104,66.65999999991  L 4.179999999939014,66.65999999991 M 108.58284010898808,25.080000000243995  L 108.58284010898808,75.240000000152 M 167.10284010888904,22.990000000153998  L 167.10284010888904,77.330000000242 M 162.70284010888906,22.990000000153998  L 162.70284010888906,77.330000000242 M 146.29839898501803,71.05999999990999  L 146.29839898501803,29.259999999911997 M 130.52784010889002,71.05999999990999  L 130.52784010889002,29.259999999911997 M 112.7628401089271,29.259999999911997  L 112.7628401089271,71.05999999990999 M 112.7628401089271,14.630000000243996  L 144.11284010892905,14.630000000243996 M 112.7628401089271,22.990000000153998  L 144.11284010892905,22.990000000153998 M 112.7628401089271,29.259999999911997  L 130.52784010889002,29.259999999911997 M 112.7628401089271,22.990000000153998  L 112.7628401089271,29.259999999911997 M 108.58284010898808,4.180000000243993  L 108.58284010898808,25.080000000243995 M 112.7628401089271,14.630000000243996  L 112.7628401089271,22.990000000153998 M 112.7628401089271,0.0  L 112.7628401089271,14.630000000243996 M 144.11284010892905,22.990000000153998  L 167.10284010888904,22.990000000153998 M 144.11284010892905,14.630000000243996  L 144.11284010892905,22.990000000153998 M 146.29839898501803,29.259999999911997  L 162.70284010888906,29.259999999911997 M 127.39284010886809,85.690000000154  L 144.11284010892905,85.690000000154 M 112.7628401089271,77.330000000242  L 144.11284010892905,77.330000000242 M 112.7628401089271,71.05999999990999  L 130.52784010889002,71.05999999990999 M 112.7628401089271,77.330000000242  L 112.7628401089271,85.690000000154 M 108.58284010898808,75.240000000152  L 108.58284010898808,96.140000000154 M 112.7628401089271,85.690000000154  L 112.7628401089271,100.32000000039599 M 112.7628401089271,85.690000000154  L 127.39284010886809,85.690000000154 M 144.11284010892905,77.330000000242  L 144.11284010892905,85.690000000154 M 144.11284010892905,77.330000000242  L 167.10284010888904,77.330000000242 M 162.70284010888906,71.05999999990999  L 146.29839898501803,71.05999999990999 M 87.68284010898799,33.659999999911996  L 87.68284010898799,66.65999999991 M 108.58284010898808,4.180000000243993  L 87.68284010898799,33.659999999911996 M 108.58284010898808,96.140000000154  L 87.68284010898799,66.65999999991 M 25.07999999993899,33.659999999911996  L 25.07999999993899,66.65999999991 z", 
        "draw2": "", 
        "draw3": "", 
        "draw4": "", 
        "width": 167.1, 
        "height": 100.32
        };

      // Crea un gruppo per contenere tutti gli elementi del cassone
      const cassoneGroup = this.draw.group();

      // Calcola il centro del cassone per la rotazione
      const centerX = data.width / 2;
      const centerY = data.height / 2;


      const pathPulito = data.draw.replace(/\s+/g, '')

      // Aggiungi con path 
       const cassone1 = this.draw.path(pathPulito);
       cassone1.stroke({ color: 'rgb(0, 0, 0)', width: 2 });
       // cassone1.draggable()

       data.labels.forEach((label)=>{
         const text = this.draw.text(label.value)
         .font({ size: label.label_h })
         .move(label.label_x, label.label_y)
         .fill('black'); 
         cassoneGroup.add(text)
       })

       cassoneGroup.add(cassone1);

       cassoneGroup.transform({origin: [centerX, centerY]})

       cassoneGroup.draggable()
  
       // Salva il riferimento al gruppo
      this.selectedElement = cassoneGroup;
      this.listaSelezionati.push(this.selectedElement)
    
      }


      creaCassone2(){

        const data = {
          "labels": [{"value": "TR2", "label_h": 21.5, "label_x": 120.40919159342502, "label_y": -7.049911578538001}], 
          "arrows": [], 
          "circles": [], 
          "polylines": [], 
          "draw": "M 54.33999999996195,71.05999999990999  L 54.33999999996195,77.330000000242 M 167.37649551797813,96.140000000154  L 167.37649551797813,4.180000000244 M 171.55649551791612,100.32000000039599  L 171.55649551791612,0.0 M 167.37649551797813,4.180000000244  L 146.47649551797804,33.659999999912 M 167.37649551797813,96.140000000154  L 146.47649551797804,66.65999999991 M 167.37649551797813,4.180000000244  L 54.33999999996195,4.180000000244 M 54.33999999996195,96.140000000154  L 167.37649551797813,96.140000000154 M 171.55649551791612,0.0  L 54.33999999996195,0.0 M 54.33999999996195,100.32000000039599  L 171.55649551791612,100.32000000039599 M 58.519999999901074,25.080000000244  L 58.519999999901074,75.240000000152 M 0.0,22.990000000153998  L 0.0,77.330000000242 M 4.400000000000091,22.990000000153998  L 4.400000000000091,77.330000000242 M 20.80444112387113,71.05999999990999  L 20.80444112387113,29.259999999911997 M 36.575000000000045,71.05999999990999  L 36.575000000000045,29.259999999911997 M 54.33999999996195,29.259999999911997  L 54.33999999996195,71.05999999990999 M 54.33999999996195,14.630000000243996  L 22.98999999995999,14.630000000243996 M 54.33999999996195,22.990000000153998  L 22.98999999995999,22.990000000153998 M 54.33999999996195,29.259999999911997  L 36.575000000000045,29.259999999911997 M 54.33999999996195,22.990000000153998  L 54.33999999996195,29.259999999911997 M 58.519999999901074,4.180000000244  L 58.519999999901074,25.080000000244 M 54.33999999996195,14.630000000243996  L 54.33999999996195,22.990000000153998 M 54.33999999996195,0.0  L 54.33999999996195,14.630000000243996 M 22.98999999995999,22.990000000153998  L 0.0,22.990000000153998 M 22.98999999995999,14.630000000243996  L 22.98999999995999,22.990000000153998 M 20.80444112387113,29.259999999911997  L 4.400000000000091,29.259999999911997 M 39.71000000002209,85.690000000154  L 22.98999999995999,85.690000000154 M 54.33999999996195,77.330000000242  L 22.98999999995999,77.330000000242 M 54.33999999996195,71.05999999990999  L 36.575000000000045,71.05999999990999 M 54.33999999996195,77.330000000242  L 54.33999999996195,85.690000000154 M 58.519999999901074,75.240000000152  L 58.519999999901074,96.140000000154 M 54.33999999996195,85.690000000154  L 54.33999999996195,100.32000000039599 M 54.33999999996195,85.690000000154  L 39.71000000002209,85.690000000154 M 22.98999999995999,77.330000000242  L 22.98999999995999,85.690000000154 M 22.98999999995999,77.330000000242  L 0.0,77.330000000242 M 4.400000000000091,71.05999999990999  L 20.80444112387113,71.05999999990999 M 79.41999999990094,33.659999999912  L 79.41999999990094,66.65999999991 M 58.519999999901074,4.180000000244  L 79.41999999990094,33.659999999912 M 58.519999999901074,96.140000000154  L 79.41999999990094,66.65999999991 M 146.47649551797804,33.659999999912  L 146.47649551797804,66.65999999991 M 79.41999999990094,66.65999999991  L 146.47649551797804,66.65999999991 M 79.41999999990094,33.659999999912  L 146.47649551797804,33.659999999912 z", 
          "draw2": "", 
          "draw3": "", 
          "draw4": "", 
          "width": 171.56, 
          "height": 100.32
        }

              // Crea un gruppo per contenere tutti gli elementi del cassone
        const cassoneGroup2 = this.draw.group();

      // Calcola il centro del cassone per la rotazione
        const centerX = data.width / 2;
        const centerY = data.height / 2;


        const pathPulito2 = data.draw.replace(/\s+/g, '')

        

        let cassone2 = this.draw.path(pathPulito2)
        cassone2.stroke({ color: 'rgb(0, 0, 0)', width: 2 });
        
        
        data.labels.forEach((label)=>{
          const text = this.draw.text(label.value)
          .font({ size: label.label_h })
          .move(label.label_x, label.label_y)
          .fill('black'); 
          cassoneGroup2.add(text)
        })
 
        cassoneGroup2.add(cassone2);
 
        cassoneGroup2.transform({origin: [centerX, centerY]})
 
        cassoneGroup2.draggable()
   
        // Salva il riferimento al gruppo
       this.selectedElement = cassoneGroup2;
       this.listaSelezionati.push(this.selectedElement)


      }

      creaDef1(){
        const data = {
          "labels": [{"value": "DEF1", "label_h": 11.5, "label_x": -6.681051064778103, "label_y": 46.351302296852}], 
          "arrows": [], 
          "circles": [], 
          "polylines": [], 
          "draw": "0.0,0.0  0.0,30.0  20.0,30.0  20.0,0.0  0.0,0.0", 
          "draw2": "M 19.292893218814015,29.292893218813003  L 17.87867965644091,27.878679656440003 M 19.292893218814015,27.878679656440003  L 17.87867965644091,29.292893218813003 M 19.292893218814015,2.1213203435590025  L 17.87867965644091,0.7071067811860026 M 19.292893218814015,0.7071067811860026  L 17.87867965644091,2.1213203435590025 M 2.1213203435600008,29.292893218813003  L 0.7071067811868943,27.878679656440003 M 2.1213203435600008,27.878679656440003  L 0.7071067811868943,29.292893218813003 M 2.1213203435600008,2.1213203435590025  L 0.7071067811868943,0.7071067811860026 M 2.1213203435600008,0.7071067811860026  L 0.7071067811868943,2.1213203435590025 M 18.585786437626894,28.585786437627  L 10.0,15.000000000000002 M 1.414213562372879,28.585786437627  L 10.0,15.000000000000002 M 10.0,15.000000000000002  L 18.585786437626894,1.4142135623729999 M 1.414213562372879,1.4142135623729999  L 10.0,15.000000000000002 z", 
          "draw3": "", 
          "draw4": "", 
          "width": 20.0, 
          "height": 30.0
      }

      const centerX = data.width / 2
      const centerY = data.height / 2

      const def1Group = this.draw.group();

      let puntiArr = data.draw.split("  ")

      console.log(puntiArr)

       let points = puntiArr.map(a=>a.split(",").map(Number))
       console.log(points)

       let def1 = this.draw.polyline(points)
       def1.fill("none")
       def1.stroke({ color: 'rgb(0, 0, 0)', width: 2})

       def1Group.add(def1)

       data.labels.forEach((label)=>{
        const text = this.draw.text(label.value)
        .font({ size: label.label_h })
        .move(label.label_x, label.label_y)
        .fill('black'); 
        def1Group.add(text)
      })

       let pathPulito = data.draw2.replace(/\s+/g, '')
       console.log(pathPulito)

       let def1draw2 = this.draw.path(pathPulito)
      def1draw2.stroke({ color: 'rgb(0, 0, 0)', width: 2, fill: "pink"})
      def1Group.add(def1draw2)
      def1Group.transform({origin: [centerX, centerY]})

      

      def1Group.draggable()

       // Salva il riferimento al gruppo
       this.selectedElement = def1Group;
       this.listaSelezionati.push(this.selectedElement)

      }

      creaN7DXN7SX(){

        const data = {
        "labels": [
                  {"value": "N7-SX", "label_h": 11.5, "label_x": -52.42028164713906, "label_y": 82.59945460286599}, 
                  {"value": "N7-DX", "label_h": 11.5, "label_x": -53.35473164713903, "label_y": 40.479108556814026}
                  ], 
        "arrows": [
                   {"x": 0.0, "y": 0.0, "type": 11, "width": 0, "height": 0, "rotation": 0, "bind_to": "cmap_nastro_n7-sx", "path": "-32.99188824318503,68.926986992347  -29.691888243185076,64.52698699234702  -31.341888243185053,64.52698699234702  -31.341888243185053,57.926986992347  -34.64188824318501,57.926986992347  -34.64188824318501,64.52698699234702  -36.291888243184985,64.52698699234702  -32.99188824318503,68.926986992347"},
                   {"x": 0.0, "y": 0.0, "type": 10, "width": 0, "height": 0, "rotation": 0, "bind_to": "cmap_nastro_n7-dx", "path": "-32.99188824318503,42.52698699234702  -36.291888243184985,46.926986992347  -34.64188824318501,46.926986992347  -34.64188824318501,53.52698699234702  -31.341888243185053,53.52698699234702  -31.341888243185053,46.926986992347  -29.691888243185076,46.926986992347  -32.99188824318503,42.52698699234702"}
                  ], 
        "circles": [], 
        "polylines": [], 
        "draw": "", 
        "draw2": "", 
        "draw3": "", 
        "draw4": "", 
        "direction": "VERTICAL", 
        "width": 117.16, 
        "height": 13.23, 
        "radiusBorder": 1.1, 
        "radiusBelt": 4.4
      }

      const centerX = data.width / 2
      const centerY = data.height / 2

      const gruppoN7DXN7SX = this.draw.group();

      // Aggiunge le frecce al gruppo
      data.arrows.forEach(arrow => {

        console.log(arrow.path.split("  "))
        const points = arrow.path.split("  ").map(pair => pair.split(",").map(Number));
        console.log(points)
        const polyline = this.draw.polyline(points)
          .fill('none')
          .stroke({ color: 'black', width: 1 })
          gruppoN7DXN7SX.add(polyline);
      });

      data.labels.forEach((label)=>{
        const text = this.draw.text(label.value)
        .font({ size: label.label_h })
        .move(500, 500)
        .fill('black') 
        .draggable()
        // gruppoN7DXN7SX.add(text)
        
      })


      gruppoN7DXN7SX.move(500, 500)
     gruppoN7DXN7SX.transform({origin: [centerX, centerY]})
      gruppoN7DXN7SX.draggable()

       // Salva il riferimento al gruppo
       this.selectedElement = gruppoN7DXN7SX;
       this.listaSelezionati.push(this.selectedElement)

      }

      creaFineCorsa() {
        const dataFC = {
          "labels": [], 
          "arrows": [], 
          "circles": [], 
          "polylines": [], 
          "draw": "3.2999999999999545,11.0  6.5999999999989996,6.600000000000023  4.9500000000000455,6.600000000000023  4.9500000000000455,0.0  1.650000000000091,0.0  1.650000000000091,6.600000000000023  0.0,6.600000000000023  3.2999999999999545,11.0", 
          "draw2": "", 
          "draw3": "", 
          "draw4": ""
        }


        let puntiStrArr = dataFC.draw.split("  ")

        let x = puntiStrArr.map(e=>e.split(",").map(Number))
        console.log(x)
        const poly = this.draw.polyline(x)
        poly.draggable()

        }

        creaLineaCollegamento(){

          const dataLNK = {
            "labels": [], 
            "arrows": [], 
            "circles": [], 
            "polylines": [], 
            "draw": "M12.000000000003865,0.0L20.0,6.0L12.000000000003865,12.0L12.000000000003865,9.0L0.0,9.0L0.0,3.0L12.000000000003865,3.0L12.000000000003865,0.0z", 
            "draw2": "", 
            "draw3": "", 
            "draw4": "", 
            "width": 20.0, 
            "height": 12.0
          }

          let path = this.draw.path(dataLNK.draw)
          //let pol = path.toPoly()
          //pol.draggable()

          
          path.stroke({ color: 'black', width: 1 })
          path.draggable()

        }

        creaTesto(){

          const text = this.draw.text("CIAO")
          text.font({ size: 50 })
          text.fill("black")
          text.move(50, 50)
          text.transform({rotate: 45})
          text.draggable()
          
        }



     //++++++++++++++ Event handlers bottoni manipolazione +++++++++++++++++++

  
    ruotare(elemento: SVGElement | G) {
      this.rotation += 5;
      
      // Se l'elemento è un gruppo, ruota attorno al suo centro
      if (elemento instanceof G) {
        const trasformazioni = {
          rotate: this.rotation,
          origin: 'center center' // Imposta il punto di rotazione al centro
        };
  
        // Aggiunge le scale se necessario
        if (this.xStretchata > 1) {
          if (this.ingrandimento > 1) {
            // @ts-ignore
            trasformazioni['scaleX'] = this.ingrandimento * this.xStretchata;
            // @ts-ignore
            trasformazioni['scaleY'] = this.ingrandimento;
          } else {
            // @ts-ignore
            trasformazioni['scaleX'] = this.xStretchata;
          }
        } else if (this.ingrandimento > 1) {
          // @ts-ignore
          trasformazioni['scale'] = this.ingrandimento;
        }
  
        elemento.transform(trasformazioni);
      }
      // Per elementi singoli, mantieni la logica esistente
      else {
        const trasformazioni = {
          rotate: this.rotation
        };
        
        if (this.xStretchata > 1) {
          if (this.ingrandimento > 1) {
            // @ts-ignore
            trasformazioni['scaleX'] = this.ingrandimento * this.xStretchata;
            // @ts-ignore
            trasformazioni['scaleY'] = this.ingrandimento;
          } else {
            // @ts-ignore
            trasformazioni['scaleX'] = this.xStretchata;
          }
        } else if (this.ingrandimento > 1) {
          // @ts-ignore
          trasformazioni['scale'] = this.ingrandimento;
        }
  // @ts-ignore
        elemento.transform(trasformazioni);
      }

      
  
      // Gestione del colore come prima
      if(elemento.attr('fill') === 'grey'){
        if(elemento instanceof(Polygon)){
          elemento.fill("rgb(0, 255, 136)")
        } else if(elemento instanceof(Rect)){
          elemento.fill("rgb(0, 255, 255)")
        } else if(elemento instanceof(Circle)){
          elemento.fill("rgb(255, 0, 247)")
        }
      }
      if(elemento instanceof(Line)){
        elemento.stroke({ color: 'rgb(225, 255, 0)'})
      }
    }






   scalare(elemento: SVGElement) {
    this.ingrandimento += 0.5
    console.log("Scala elemento: ", elemento);

    const trasformazioni = {
      rotate: this.rotation
    };


  // Aggiunge le scale appropriate in base alle condizioni
  if (this.xStretchata > 1) {
    if (this.ingrandimento > 1) {
        // @ts-ignore
        trasformazioni['scaleX'] = this.ingrandimento * this.xStretchata;
        // @ts-ignore
        trasformazioni['scaleY'] = this.ingrandimento;
    } else {
        // @ts-ignore
        trasformazioni['scaleX'] = this.xStretchata;
    }
} else if (this.ingrandimento > 1) {
    // @ts-ignore
    trasformazioni['scale'] = this.ingrandimento;
} 

// Applica tutte le trasformazioni insieme
elemento.transform(trasformazioni);



     // Torna al colore originario

     if(elemento.attr('fill') === 'grey'){

      if(elemento instanceof(Polygon)){
      elemento.fill("rgb(0, 255, 136)")
    } else if(elemento instanceof(Rect)){
      elemento.fill("rgb(0, 255, 255)")
    } else if(elemento instanceof(Circle)){
      elemento.fill("rgb(255, 0, 247)")
    } 
    
  } 

  if(elemento instanceof(Line)){
    elemento.stroke({ color: 'rgb(225, 255, 0)'})
  }

}









  clonare(elemento: SVGElement | G) {
      this.translation += 200;

       // Torna al colore originario

     if(elemento.attr('fill') === 'grey'){

      if(elemento instanceof(Polygon)){
      elemento.fill("rgb(0, 255, 136)")
    } else if(elemento instanceof(Rect)){
      elemento.fill("rgb(0, 255, 255)")
    } else if(elemento instanceof(Circle)){
      elemento.fill("rgb(255, 0, 247)")
    } 
    }

    if(elemento instanceof(Line)){
        elemento.stroke({ color: 'rgb(225, 255, 0)'})
    }
  



  var trasformazioni = elemento.transform();  

  console.log("Elemento: ", elemento, "Trasformazioni: ", trasformazioni)


  if(elemento instanceof Rect){
    var rect  = this.draw.rect(100, 100).attr({ fill: 'rgb(0, 255, 255)' })
    rect.transform(trasformazioni)
    rect.move(500, 500)
    // @ts-ignore
    rect.draggable()
  } else if(elemento instanceof G){
    // @ts-ignore
          // Clona il gruppo
          const gruppoClone = elemento.clone();  // Clona l'intero gruppo

          console.log("G clone children: ", gruppoClone.children()); // Usa .children() per ottenere gli oggetti SVG
          
             // Crea un gruppo per contenere tutti gli elementi del cassone "width": 167.1, "height": 100.32
             const cassoneGroup2 = this.draw.group();


          // Accedi agli elementi specifici (ad esempio, text e path) all'interno del gruppo
          const [text, path] = gruppoClone.children(); // Estrai gli elementi figli
          
         

             
             

          text.transform(trasformazioni)
          path.transform(trasformazioni)
          // @ts-ignore
          text.move(path.x, path.y)

          this.draw.add(text)
          this.draw.add(path)

          // Rendi gli elementi trascinabili
          // @ts-ignore
          text.draggable();
          // @ts-ignore
          path.draggable();
   
  } else {
    // @ts-ignore
    var clone = elemento.clone(true)
    console.log("Clone: ", clone)
    clone.transform(trasformazioni)
    this.draw.add(clone)
    // @ts-ignore
    clone.draggable()
  }

  /*

  console.log("Larghezza elemento", elemento.width())


  if(this.rotation == 0){
    var clone = elemento.clone(true);
    

    if(this.ingrandimento == 1){

      clone.transform({
        translateX: this.translation,
        scaleX: this.xStretchata
      })


      // @ts-ignore
      clone.draggable()
      this.draw.add(clone)

    }  else if(this.ingrandimento == 1.5){

      
      var clone = elemento.clone(true);
      this.larghezza += clone.width() as number 

      console.log("Larghezza clone: ", this.larghezza)

      this.translation += 50

      clone.transform({
        translateX: this.translation,
        scaleY: this.ingrandimento,
        scaleX: this.ingrandimento * this.xStretchata
      })

      // @ts-ignore
      clone.draggable()
      this.draw.add(clone)

    } else if(this.ingrandimento == 2){

      
      var clone = elemento.clone(true);
      this.larghezza += clone.width() as number 

      console.log("Larghezza clone: ", this.larghezza)

      this.translation += 100

      clone.transform({
        translateX: this.translation,
        scaleY: this.ingrandimento,
        scaleX: this.ingrandimento * this.xStretchata
      })

      // @ts-ignore
      clone.draggable()
      this.draw.add(clone)

    } else if(this.ingrandimento == 2.5){

      
      var clone = elemento.clone(true);
      this.larghezza += clone.width() as number 

      console.log("Larghezza clone: ", this.larghezza)

      this.translation += 150

      clone.transform({
        translateX: this.translation,
        scaleY: this.ingrandimento,
        scaleX: this.ingrandimento * this.xStretchata
      })

      // @ts-ignore
      clone.draggable()
      this.draw.add(clone)

    } else if(this.ingrandimento >= 3){
      clone.transform({
        translateX: this.translation,
        scaleY: this.ingrandimento,
        scaleX: this.ingrandimento * this.xStretchata
      })

      // @ts-ignore
      clone.draggable()
      this.draw.add(clone)
    }

  } else if(this.rotation != 0){
      var clone = elemento.clone(true);

      clone.transform({
        translateX: this.translation,
        rotate: this.rotation,
        scaleY: this.ingrandimento,
        scaleX: this.ingrandimento * this.xStretchata
      })

      // @ts-ignore
      clone.draggable()
      this.draw.add(clone)

      if(this.ingrandimento == 1.5){

      
      this.larghezza += clone.width() as number 

      console.log("Larghezza clone: ", this.larghezza)

      this.translation += 50

      clone.transform({
        translateX: this.translation,
        scaleX: this.ingrandimento * this.xStretchata,
        rotate: this.rotation,
        scaleY: this.ingrandimento
      })

      // @ts-ignore
      clone.draggable()
      this.draw.add(clone)

    } else if(this.ingrandimento == 2){

    
    this.larghezza += clone.width() as number 

    console.log("Larghezza clone: ", this.larghezza)

    this.translation += 100

    clone.transform({
      translateX: this.translation,
      scaleX: this.ingrandimento * this.xStretchata,
      rotate: this.rotation,
      scaleY: this.ingrandimento
    })

    // @ts-ignore
    clone.draggable()
    this.draw.add(clone)

  } else if(this.ingrandimento == 2.5){

    
    this.larghezza += clone.width() as number 

    console.log("Larghezza clone: ", this.larghezza)

    this.translation += 150

    clone.transform({
      translateX: this.translation,
      scaleX: this.ingrandimento * this.xStretchata,
      rotate: this.rotation,
      scaleY: this.ingrandimento
    })

    // @ts-ignore
    clone.draggable()
    this.draw.add(clone)

  } else if(this.ingrandimento >= 3){

    clone.transform({
      translateX: this.translation,
      scaleX: this.ingrandimento * this.xStretchata,
      rotate: this.rotation,
      scaleY: this.ingrandimento
    })

    // @ts-ignore
    clone.draggable()
    this.draw.add(clone)

  }


  } else if(this.ingrandimento != 1 && this.xStretchata !=1){
    var clone = elemento.clone(true);

    

    clone.transform({
      translateX: this.translation,
      scaleX: this.ingrandimento * this.xStretchata,
      rotate: this.rotation,
      scaleY: this.ingrandimento
    })

    
    // @ts-ignore
    clone.draggable()
    this.draw.add(clone)
    

  } else if(this.ingrandimento != 1 && this.rotation != 0){
    var clone = elemento.clone(true);

    clone.transform({
      translateX: this.translation,
      scaleX: this.ingrandimento * this.xStretchata,
      rotate: this.rotation,
      scaleY: this.ingrandimento
    })

    
    // @ts-ignore
    clone.draggable()
    this.draw.add(clone)

  } 

  */

  }









  allungaX(element: SVGElement) {

     // Torna al colore originario

     if(element.attr('fill') === 'grey'){

      if(element instanceof(Polygon)){
      element.fill("rgb(0, 255, 136)")
    } else if(element instanceof(Rect)){
      element.fill("rgb(0, 255, 255)")
    } else if(element instanceof(Circle)){
      element.fill("rgb(255, 0, 247)")
    } 
  }

  if(element instanceof(Line)){
    element.stroke({ color: 'rgb(225, 255, 0)'})
  }

  this.xStretchata += 0.5

  const trasformazioni = {
      rotate: this.rotation
  };


  if(this.ingrandimento > 1){
    // @ts-ignore
    trasformazioni['scaleX'] = this.ingrandimento * this.xStretchata;
    // @ts-ignore
    trasformazioni['scaleY'] = this.ingrandimento;
  } else{
    // @ts-ignore
    trasformazioni['scaleX'] = this.xStretchata;
  }


  element.transform(trasformazioni)

  }




  setZeta() {
    if(this.listaSelezionati.length >= 2){
      let ultimo = this.listaSelezionati.at(-1)
      let penultimo = this.listaSelezionati.at(-2)



      penultimo!.before(ultimo!)

          // Torna al colore originario

    if(penultimo!.attr('fill') === 'grey'){

          if(penultimo instanceof(Polygon)){
          penultimo.fill("rgb(0, 255, 136)")
        } else if(penultimo instanceof(Rect)){
          penultimo.fill("rgb(0, 255, 255)")
        } else if(penultimo instanceof(Circle)){
          penultimo.fill("rgb(255, 0, 247)")
        } 
      }
    
      if(penultimo instanceof(Line)){
        penultimo.stroke({ color: 'rgb(225, 255, 0)'})
      } else if(penultimo instanceof(G)){
        console.log("yeeeeeeeee")
      }

     if(ultimo!.attr('fill') === 'grey'){

      if(ultimo instanceof(Polygon)){
      ultimo.fill("rgb(0, 255, 136)")
    } else if(ultimo instanceof(Rect)){
      ultimo.fill("rgb(0, 255, 255)")
    } else if(ultimo instanceof(Circle)){
      ultimo.fill("rgb(255, 0, 247)")
    } 
  }

      if(ultimo instanceof(Line)){
        ultimo.stroke({ color: 'rgb(225, 255, 0)'})
      } else if(ultimo instanceof(G)){
        console.log("yaaaaaa")
      }

  };
  }



  cancellaEl(element: SVGElement) {
    // @ts-ignore
    element.remove();
    this.rotation = 0; 
    this.ingrandimento = 1;
    this.translation = 0;
    this.xStretchata = 1;
   
  }

  cancellaTutto() {

    this.draw.clear();
    this.rotation = 0; 
    this.ingrandimento = 1;
    this.translation = 0;
    this.xStretchata = 1;

  }

  zoommaOut() {

  
    this.vb_width += 100;
    this.vb_height += 100; 
    this.draw.viewbox(this.vb_min_x, this.vb_min_y, this.vb_width, this.vb_height)

    

     

    }
  
  zoommaIn() {

    
    this.vb_width -= 100;
    this.vb_height -= 100; 

    this.draw.viewbox(this.vb_min_x, this.vb_min_y, this.vb_width, this.vb_height)

    console.log(this.vb_width, this.vb_height)
  
  
  }

  vaiASin(){

    this.vb_min_x += 100;
    this.draw.viewbox(this.vb_min_x, this.vb_min_y, this.vb_width, this.vb_height);

  }

  vaiADes(){

    this.vb_min_x -= 100;
    this.draw.viewbox(this.vb_min_x, this.vb_min_y, this.vb_width, this.vb_height);

  }

  vaiUp() {
    this.vb_min_y += 100;
    this.draw.viewbox(this.vb_min_x, this.vb_min_y, this.vb_width, this.vb_height);
  }

  vaiDown() {
    this.vb_min_y -= 100;
    this.draw.viewbox(this.vb_min_x, this.vb_min_y, this.vb_width, this.vb_height);
  }

  blocca(){
    let lista = this.draw.children()
    lista.forEach((e: { draggable: (arg0: boolean) => any; })=>e.draggable(false))
  }

  sblocca(){
    let lista = this.draw.children()
    lista.forEach((e: { draggable: (arg0: boolean) => any; })=>e.draggable(true))
  
  }


  // funzione che disegna e aggiorna la griglia

  drawGrid(draw: any, vb_min_x: any, vb_min_y: any, vb_width: any, vb_height: any, gridSize: any) {
    // Pulisce eventuali griglie precedenti
    draw.clear();
    
    // Estendi la griglia per essere molto più grande della vista del viewBox
    const extendedWidth = vb_width * 4;  // Quattro volte la larghezza del viewBox
    const extendedHeight = vb_height * 4; // Quattro volte l'altezza del viewBox
    
    // Calcola il numero di linee orizzontali e verticali
    const verticalLinesCount = Math.floor(extendedWidth / gridSize);
    const horizontalLinesCount = Math.floor(extendedHeight / gridSize);

    // Disegna le linee verticali
    for (let i = 0; i <= verticalLinesCount; i++) {
        const x = vb_min_x + i * gridSize;
        draw.line(x, vb_min_y, x, vb_min_y + extendedHeight).stroke({ color: '#cccccc', width: 1, dasharray: '2,2' });
        if (x % 5 === 0 && x !== 6150){
          draw.text(x)
          .font({ size: 10 })
          .move(x, 0)
          .fill('black');  

          draw.text(x)
          .font({ size: 10 })
          .move(x, vb_min_y + extendedHeight)
          .fill('black');

        } else if (x === 6150){
          draw.text()
          .font({ size: 10 })
          .move(x, 0)
          .fill('black');
        }
    }

    // Disegna le linee orizzontali
    for (let i = 0; i <= horizontalLinesCount; i++) {
        const y = vb_min_y + i * gridSize;
        draw.line(vb_min_x, y, vb_min_x + extendedWidth, y).stroke({ color: '#cccccc', width: 1, dasharray: '2,2' });
        if (y % 5 === 0 && y !== 4000){
          draw.text(y)
          .font({ size: 10 })
          .move(0, y)
          .fill('black'); 

          draw.text(y)
          .font({ size: 10 })
          .move(vb_min_x + extendedWidth, y)
          .fill('black');
        

        } else if(y === 4000) {

          draw.text(0)
          .font({ size: 10 })
          .move(0, y)
          .fill('black'); 

          draw.text(0)
          .font({ size: 10 })
          .move(vb_min_x + extendedWidth, y)
          .fill('black');
        }
      }
}
    

}
