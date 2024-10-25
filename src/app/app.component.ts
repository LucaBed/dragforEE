import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { Circle, Line, Polygon, Rect, SVG, Element as SVGElement } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CdkDrag],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {





  @ViewChild('svgField') svgField!: ElementRef;

  title = 'draggo';
  draw: any;
  selectedElement!: SVGElement;
  rotation = 0; 
  ingrandimento = 1;
  translation = 0;
  larghezza = 0;
  //draggoPuntoX2 = 0;
  xStretchata = 1;
  quadrato!: SVGElement;

  listaRect = [];

 


  ngAfterViewInit(): void {
    
    this.draw = SVG().addTo(this.svgField.nativeElement)
    //var rect  = this.draw.rect(100, 100).attr({ fill: '#f06' })
    // @ts-ignore
    //rect.draggable()

    //var clone = rect.clone(true);

     // @ts-ignore
    //clone.draggable()


    //this.draw.add(clone)


   
    // evento di selezione dell'elemento
    this.draw.on('dblclick', (e)=>{
      
      console.log("Doppio click su: ", e.target)
      this.selectedElement =  SVG(e.target) as SVGElement;

      if(this.selectedElement instanceof(Line)){
      this.selectedElement.stroke({ color: 'grey'})

      /*

      this.selectedElement.on('dragmove', (event)=>{
     

         // @ts-ignore
      console.log(event)
      
       // @ts-ignore
       // var mouseX1 =  this.selectedElement.attr("x1")
     
      
      // @ts-ignore
      // var mouseY1 = this.selectedElement.attr("y1")

        // @ts-ignore
        // var mouseX2 = event.detail.event.clientX;
        // @ts-ignore
        // var mouseY2 = event.detail.event.clientY;

      
        // @ts-ignore
        // var bx1  = event.detail.box.x
        // @ts-ignore
        var by1 = event.detail.box.y

        // @ts-ignore
        var bx2  = event.detail.box.x2
        
        // @ts-ignore
        var by2  = event.detail.box.y2

        // console.log(mouseX1, mouseY1, mouseX2, mouseY2)
  
        // Aggiorna l'estremo della linea

        // @ts-ignore
       this.selectedElement.plot(50, by1, bx2, by2)
   

      })

      //   console.log(event)
      //   // @ts-ignore
      //   const x2 = event.detail.p.x
      //   // @ts-ignore
      //   const y2 = event.detail.p.y
      //   // @ts-ignore
      //   this.selectedElement.plot(this.selectedElement.x(), this.selectedElement.y(), x2, y2)
      // })

      */
      } else {
        this.selectedElement.fill("grey")
      }
    }
    )


 

    
  }

 
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


  //++++++++++++++ Event handlers bottoni manipolazione ++++++++++++




    ruotare(elemento: SVGElement) {
      // this.rectRotation = 0;
      
      this.rotation += 5;
      console.log("On rotation: ", elemento)

      // Applica tutte le trasformazioni in un'unica chiamata transform
    const trasformazioni = {
      rotate: this.rotation
  };

  // Aggiungi le scale appropriate in base alle condizioni
  if (this.xStretchata > 1) {
      if (this.ingrandimento > 1) {
          // Caso con entrambe le trasformazioni
          // @ts-ignore
          trasformazioni['scaleX'] = this.ingrandimento * this.xStretchata;
          // @ts-ignore
          trasformazioni['scaleY'] = this.ingrandimento;
      } else {
          // Solo stretching X
          // @ts-ignore
          trasformazioni['scaleX'] = this.xStretchata;
      }
  } else if (this.ingrandimento > 1) {
      // Solo ingrandimento uniforme
      // @ts-ignore
      trasformazioni['scale'] = this.ingrandimento;
  }

  // Applica tutte le trasformazioni insieme
  elemento.transform(trasformazioni);
    
      // Torno al colore originario

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

    if(this.rotation == 0){
    elemento.transform({
      scale: this.ingrandimento  // scalo l'elemento selezionato
    })
    } else{
      elemento.transform({
        scale: this.ingrandimento,  // scalo l'elemento selezionato
        rotate: this.rotation,
      })
    }

     // Torno al colore originario

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









  clonare(elemento: SVGElement) {
      this.translation += 200;

       // Torno al colore originario

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

  console.log("Larghezza elemento", elemento.width())

  if(this.rotation == 0){
    var clone = elemento.clone(true);
    

    if(this.ingrandimento == 1){

      clone.transform({
        translateX: this.translation,
        scale: this.ingrandimento
      })

      // console.log("Larghezza clone", clone.width())

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
        scale: this.ingrandimento
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
        scale: this.ingrandimento
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
        scale: this.ingrandimento
      })

      // @ts-ignore
      clone.draggable()
      this.draw.add(clone)

    } else if(this.ingrandimento >= 3){
      clone.transform({
        translateX: this.translation,
        scale: this.ingrandimento
      })

      // console.log("Larghezza clone", clone.width())

      // @ts-ignore
      clone.draggable()
      this.draw.add(clone)
    }

  } else if(this.rotation != 0){
      var clone = elemento.clone(true);

      clone.transform({
        translateX: this.translation,
        rotate: this.rotation,
        scale: this.ingrandimento
      })

      // @ts-ignore
      clone.draggable()
      this.draw.add(clone)

      if(this.ingrandimento == 1.5){

      
      //var clone = elemento.clone(true);
      this.larghezza += clone.width() as number 

      console.log("Larghezza clone: ", this.larghezza)

      this.translation += 50

      clone.transform({
        translateX: this.translation,
        scale: this.ingrandimento,
        rotate: this.rotation,
      })

      // @ts-ignore
      clone.draggable()
      this.draw.add(clone)

    } else if(this.ingrandimento == 2){

    
    //var clone = elemento.clone(true);
    this.larghezza += clone.width() as number 

    console.log("Larghezza clone: ", this.larghezza)

    this.translation += 100

    clone.transform({
      translateX: this.translation,
      scale: this.ingrandimento,
      rotate: this.rotation,
    })

    // @ts-ignore
    clone.draggable()
    this.draw.add(clone)

  } else if(this.ingrandimento == 2.5){

    
    //var clone = elemento.clone(true);
    this.larghezza += clone.width() as number 

    console.log("Larghezza clone: ", this.larghezza)

    this.translation += 150

    clone.transform({
      translateX: this.translation,
      scale: this.ingrandimento,
      rotate: this.rotation,
    })

    // @ts-ignore
    clone.draggable()
    this.draw.add(clone)

  } else if(this.ingrandimento >= 3){

    
    //var clone = elemento.clone(true);
    // this.larghezza += clone.width() as number 

    // console.log("Larghezza clone: ", this.larghezza)

    // this.translation += 150

    clone.transform({
      translateX: this.translation,
      scale: this.ingrandimento,
      rotate: this.rotation,
    })

    // @ts-ignore
    clone.draggable()
    this.draw.add(clone)

  }


  } else if(this.ingrandimento != 1){
    var clone = elemento.clone(true);

    

    clone.transform({
      translateX: this.translation,
      scale: this.ingrandimento,
      rotate: this.rotation
    })

    
    // @ts-ignore
    clone.draggable()
    this.draw.add(clone)
    

  } else if(this.ingrandimento != 1 && this.rotation != 0){
    var clone = elemento.clone(true);

    clone.transform({
      translateX: this.translation,
      scale: this.ingrandimento,
      rotate: this.rotation
    })

    
    // @ts-ignore
    clone.draggable()
    this.draw.add(clone)

  } 

  }









  allungaX(element: SVGElement) {

     // Torno al colore originario

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

    if(this.ingrandimento == 1){
    element.transform({
      scaleX: this.xStretchata
    })} else if (this.ingrandimento > 1){
      element.transform({
        scaleY: this.ingrandimento,
        scaleX: this.ingrandimento * this.xStretchata  // Moltiplica i fattori di scala
      })
    }

  }
}
