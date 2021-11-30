import { Component, OnInit } from '@angular/core';
import timeLine from '../_files/timeline_experiences.json';

interface TIMELINE {
  initYear: number;
  initMonth: number;
  compYear: number;
  compMonth: number;
  position: string;
  company: string;
  type: string;
  label: string;
  country: string;
}

interface DISPLAY {
  Year?: number;
}

interface EDUCATION {
  topPostion: number;
  height: number;
  position: string;
  company: string;
  type: string;
  country: string;
  color: string;
  initPeriod: string;
  completePeriod: string;
}

interface WORK {
  topPostion: number;
  height: number;
  position: string;
  company: string;
  type: string;
  country: string;
  color: string;
  initPeriod: string;
  completePeriod: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Timeline: TIMELINE[] = timeLine;
  SortTimeline: TIMELINE[] = timeLine;
  timeToShow: number= 7;
  
  //Valores a mostrar
  TIME: DISPLAY[] = [];
  workExperience: WORK[] =[];
  education: EDUCATION[] = [];


  constructor() {
    /*Higher value*/
    const STimeline = this.sort(this.Timeline.slice());
    var highestY = STimeline[0].compYear;
    highestY = highestY;

    /*Lower value*/
    const LTimeline = this.sort_invert(this.Timeline.slice());
    var lowestY = LTimeline[0].compYear;
    var value = (highestY - lowestY)+1;

    /*Obtener valores sin un tiempo determinado*/
    for(let i = highestY; i >= lowestY ; i--) { 
      let year: DISPLAY = { Year: i }
      this.TIME.push(year);
    } 

    /* Valores de CSS */
    let tLenght = (value*12)+8;
  
    STimeline.forEach((currentValue, index) => {
      /*Valores superiores del div*/
      let lYear = currentValue.compYear;
      if (lYear == lowestY){lYear=0;}else{lYear=lYear-lowestY;}
      let lYearMonth = (lYear*12)+currentValue.compMonth;


      //Set position (8rem on base)
      let position = (lYearMonth) + 8;
      let tPosition = tLenght - position;

      let iYear = currentValue.initYear;
      var d1 = ''+currentValue.initMonth+'/01/'+currentValue.initYear;
      var d2 = ''+currentValue.compMonth+'/01/'+currentValue.compYear;  

      let tallest =0;
      let iYearMonth = 0;
      if (iYear < lowestY){tallest=position-1.5;}
      else{
      
        var d1Y = new Date(d1).getFullYear();
        var d2Y = new Date(d2).getFullYear();
        var d1M = new Date(d1).getMonth();
        var d2M = new Date(d2).getMonth();
        var meses = (d2M+12*d2Y)-(d1M+12*d1Y);
        //tallest = highest
        tallest = (meses) -1.5;;
      }

      let cLabel = this.setBackground();
 //     console.log(new Date(d1).toLocaleString('default', { month: 'long' }));
      let p1 = "" + new Date(d1).toLocaleString('default', { month: 'long' }) +" "+ new Date(d1).getFullYear();
      let p2 = "" + new Date(d2).toLocaleString('default', { month: 'long' }) +" "+ new Date(d2).getFullYear();
      if(currentValue.label == 'Work'){
        let expe: WORK = { topPostion: tPosition, height: tallest, company : currentValue.company, country:currentValue.country, position: currentValue.position, type:currentValue.type, color:cLabel, initPeriod : p1, completePeriod:p2}
        this.workExperience.push(expe);
      }else{

        let expe: EDUCATION = { topPostion: tPosition, height: tallest, company : currentValue.company, country:currentValue.country, position: currentValue.position, type:currentValue.type, color:cLabel, initPeriod : p1, completePeriod:p2  }
        this.education.push(expe);
      }    

      
      // console.log(this.workExperience);
      // console.log(this.education);


    })
  

 //   console.log(LTimeline);

   }

  ngOnInit(): void {
  }

  sort(data:any[]){
    var temporal = data.sort(function (a, b) {  return b.initYear - a.initYear;  });
    return temporal;
  }
  
  sort_invert(data:any[]){
    var temporal = data.sort(function (a, b) {  return a.initYear - b.initYear;  });
    return temporal;
  }


  getMax(arr:any[], prop:string) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

/*Ramdon color --- incluid white and black color*/
  setcolor(){
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
  }

  /*Random color - without white*/
  setBackground(){
    var letters = '012345'.split('');
    var color = '#';        
    color += letters[Math.round(Math.random() * 5)];
    letters = '0123456789ABCDEF'.split('');
    for (var i = 0; i < 5; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;

  }


}
