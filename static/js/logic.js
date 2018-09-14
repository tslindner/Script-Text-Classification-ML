var numCharDefault = '8ch';
var strucTypeDefault = 'algType';
var algTypeDefault = 'Random Forest';
var lengthDefault = '50';

const colorMapper = {
  'Logistic Regression': 'green',
  'Random Forest':       'black',
  'SGD/SVM':             'blue',
  'Naive Bayesian':      'red',
  '10': 'green',
  '20': 'red',
  '30': 'blue',
  '40': 'yellow',
  '50': 'black',
};

const presets = {'0': [{'numChar': '8ch', 'strucType': 'minLen', 'length': '50'},
                       {'numChar': '8ch', 'strucType': 'minLen', 'length': '40'},
                       {'numChar': '8ch', 'strucType': 'minLen', 'length': '30'},
                       {'numChar': '8ch', 'strucType': 'minLen', 'length': '20'},
                       {'numChar': '8ch', 'strucType': 'minLen', 'length': '10'}],
                 '1': [{'numChar': '8ch', 'strucType': 'algType', 'algType': 'SGD/SVM'},
                       {'numChar': '8ch', 'strucType': 'minLen', 'length': '30'}],
                 '2': [{'numChar': '8ch', 'strucType': 'algType', 'algType': 'Random Forest'},
                       {'numChar': '8ch', 'strucType': 'minLen', 'length': '50'}],
                 '3': [{'numChar': '8ch', 'strucType': 'algType', 'algType': 'Naive Bayesian'},
                       {'numChar': '8ch', 'strucType': 'minLen', 'length': '20'}],
                 '4': [{'numChar': '8ch', 'strucType': 'algType', 'algType': 'Logistic Regression'},
                       {'numChar': '4ch', 'strucType': 'algType', 'algType': 'Logistic Regression'}],
                 '5': [{'numChar': '8ch', 'strucType': 'minLen', 'length': '10'},
                       {'numChar': '8ch', 'strucType': 'minLen', 'length': '20'},
                       {'numChar': '8ch', 'strucType': 'minLen', 'length': '30'},
                       {'numChar': '8ch', 'strucType': 'minLen', 'length': '40'},
                       {'numChar': '8ch', 'strucType': 'minLen', 'length': '50'}]};

var sideBarText = {'0': '<strong>Overview</strong> \
                         </br> </br> \
                         This preset shows all results for 8 characters, with charts separated by minimum length.  \
                         </br> </br> \
                         It is clear here that context weight has little effect on results beyond weight = 10.  However, by zooming \
                         in on the graphs, you can see that the most significant change in results appears at weight = 0. \
                         Specifically, at low minimum lengths the results for context weight = 0 are better than the results at higher context weights. \
                         However at high minimum lengths the results for context weight = 0 are the worst.\
                         </br> </br> \
                         There are similar results for the 4 character datasets. \
                         </br> </br> \
                         The rest of the presets will look at some of the other algorithms in more detail. Unless otherwise specified, all graphs will be made \
                         using the 8 character datasets.',

                   '1': '<strong>SGD/SVM</strong> \
                         </br> </br> \
                         This preset shows results for SGD/SVM at 8 characters against all results at a minimum length of 30, \
                         </br> </br> \
                         These graphs show that while Stochastic Gradient Descent/Support Vector Machine (SGD/SVM) \
                         has the best result, it is unreliable. None of the other algorithms have the same inconsistency.',

                   '2': '<strong>Random Forest</strong> \
                         </br> </br> \
                         This preset shows the results for Random Forest, compared to all algorithms at a minimum length of 50. \
                         <.br> </br> \
                         Due to the consistency and resulting score, Random Forest seems to be the best method of those tested here.',

                   '3': '<strong>Naive Bayesian</strong> \
                         </br> </br> \
                         This preset shows the results for Naive Bayesian, compared to all algorithms at a minimum length of 20. \
                         </br> </br> \
                         The results of using Naive Bayesian are the worst of the consistent algorithms.  It does however have the best\
                         consistency. \
                         </br> </br> \
                         Naive Bayesian is also the most affected by context weight, with a clear dip as context weight approaches 0.',

                   '4': '<strong>Comparing 4char and 8char</strong> \
                         </br> </br> \
                         This preset shows the results for Logistic Regression, separated by number of characters. \
                         </br> </br> \
                         There is no preset focusing on Logistic Regression because there are no significant results.  However, it \
                         can be used to display a trend seen with all algorithms tested. \
                         </br> </br> \
                         While results for 4 character and 8 character datasets have similar results for high minimum length counts, \
                         The 4 character datasets perform better than 8 character datasets at low minimum lengths.',
                        
                   '5': '<strong>Comparing minimum lengths</strong> \
                         </br> </br> \
                         This preset shows the results for all datasets, separated by minimum length. \
                         </br> </br> \
                         While the algorithms perform as expected at higher minimum lengths, that is, the best results come from a minimum length of 50, \
                         a minimum length of 20 actually performs worse than a minimum length of 10 for all algorithms.',};

const cssButtonSize = 'width: 100px; height: 7.2vh; float: left; background: ;'

const algTypeList = ['Logistic Regression', 'Random Forest', 'SGD/SVM', 'Naive Bayesian'];
const lengthList = ['10', '20', '30', '40', '50'];

var mainDiv = document.getElementById('main');

class Graph{
    constructor(dataSet, id, parameters) {
      this.dataSet = dataSet;
      this.id = id;
      this.parameters = parameters;
      this.numCharSelected = numCharDefault;
      this.strucTypeSelected = strucTypeDefault;
      this.algTypeSelected = algTypeDefault;
      this.lengthSelected = lengthDefault;

      this.dashboardDiv = document.createElement('div');
      this.dashboardDiv.setAttribute('id', `dashboard${id}`);
      this.dashboardDiv.style.display = 'inline-block';
      this.dashboardDiv.style.height = '50vh';
      this.dashboardDiv.style.marginBottom = '10vh';

      console.log(this.parameters);


      mainDiv.appendChild(this.dashboardDiv);

      var buttonsDiv = document.createElement('div');
      buttonsDiv.setAttribute('id', `buttonsDiv${id}`);
      buttonsDiv.style.display = 'block';
      buttonsDiv.style.float = 'left';
      buttonsDiv.style.width = '200px';

      var graphDiv = document.createElement('div');
      graphDiv.setAttribute('id', `graphDiv${id}`);
      graphDiv.style.display = 'block';
      graphDiv.style.float = 'left';
      graphDiv.style.width = 'calc(100vw - 500px)';


      this.dashboardDiv.appendChild(buttonsDiv);
      this.dashboardDiv.appendChild(graphDiv);

      var button4ch = document.createElement('button');
      var button8ch = document.createElement('button');

      var buttonAlgType = document.createElement('button');
      var buttonMinLen = document.createElement('button');

      var buttonRf = document.createElement('button');
      var buttonSgd = document.createElement('button');
      var buttonLr = document.createElement('button');
      var buttonNb = document.createElement('button');

      var button10 = document.createElement('button');
      var button20 = document.createElement('button');
      var button30 = document.createElement('button');
      var button40 = document.createElement('button');
      var button50 = document.createElement('button');

      var buttonDel = document.createElement('button');


      button4ch.setAttribute("id", `4charId${id}`);
      button8ch.setAttribute("id", `8charId${id}`);

      buttonAlgType.setAttribute("id", `algTypeId${id}`);
      buttonMinLen.setAttribute("id", `minLenId${id}`);

      buttonRf.setAttribute("id", `rfId${id}`);
      buttonSgd.setAttribute("id", `sgdId${id}`);
      buttonLr.setAttribute("id", `lrId${id}`);
      buttonNb.setAttribute("id", `nbId${id}`);

      button10.setAttribute("id", `10Id${id}`);
      button20.setAttribute("id", `20Id${id}`);
      button30.setAttribute("id", `30Id${id}`);
      button40.setAttribute("id", `40Id${id}`);
      button50.setAttribute("id", `50Id${id}`);

      buttonDel.setAttribute("id", `del${id}`);


      var node4ch = document.createTextNode('4 Char');
      var node8ch = document.createTextNode('8 Char');

      var nodeAlgType = document.createTextNode('Algorithm');
      var nodeMinLen = document.createTextNode('Minimum');

      var nodeRf = document.createTextNode('Random');
      var nodeSgd = document.createTextNode('SGD/SVM');
      var nodeLr = document.createTextNode('Logistic');
      var nodeNb = document.createTextNode('Naive');

      var node10 = document.createTextNode('<10');
      var node20 = document.createTextNode('<20');
      var node30 = document.createTextNode('<30');
      var node40 = document.createTextNode('<40');
      var node50 = document.createTextNode('<50');

      var nodeDel = document.createTextNode('Delete');


      button4ch.appendChild(node4ch);
      button8ch.appendChild(node8ch);

      buttonAlgType.appendChild(nodeAlgType);
      buttonMinLen.appendChild(nodeMinLen);

      buttonRf.appendChild(nodeRf);
      buttonSgd.appendChild(nodeSgd);
      buttonLr.appendChild(nodeLr);
      buttonNb.appendChild(nodeNb);

      button10.appendChild(node10);
      button20.appendChild(node20);
      button30.appendChild(node30);
      button40.appendChild(node40);
      button50.appendChild(node50);

      buttonDel.appendChild(nodeDel);

      buttonsDiv.appendChild(button4ch);
      buttonsDiv.appendChild(button8ch);
      buttonsDiv.appendChild(document.createElement('br'));

      buttonsDiv.appendChild(buttonMinLen);
      buttonsDiv.appendChild(buttonAlgType);
      buttonsDiv.appendChild(document.createElement('br'));

      buttonsDiv.appendChild(button10);
      buttonsDiv.appendChild(buttonRf);
      buttonsDiv.appendChild(document.createElement('br'));
      buttonsDiv.appendChild(button20);
      buttonsDiv.appendChild(buttonSgd);
      buttonsDiv.appendChild(document.createElement('br'));

      buttonsDiv.appendChild(button30);
      buttonsDiv.appendChild(buttonLr);
      buttonsDiv.appendChild(document.createElement('br'));
      buttonsDiv.appendChild(button40);
      buttonsDiv.appendChild(buttonNb);
      buttonsDiv.appendChild(document.createElement('br'));
      buttonsDiv.appendChild(button50);
      buttonsDiv.appendChild(buttonDel);

      this.button4chObj = document.getElementById(`4charId${id}`);
      this.button8chObj = document.getElementById(`8charId${id}`);
      this.buttonAlgTypeObj = document.getElementById(`algTypeId${id}`);
      this.buttonMinLenObj = document.getElementById(`minLenId${id}`);
      this.buttonRfObj = document.getElementById(`rfId${id}`);
      this.buttonSgdObj = document.getElementById(`sgdId${id}`);
      this.buttonLrObj = document.getElementById(`lrId${id}`);
      this.buttonNbObj = document.getElementById(`nbId${id}`);
      this.button10Obj = document.getElementById(`10Id${id}`);
      this.button20Obj = document.getElementById(`20Id${id}`);
      this.button30Obj = document.getElementById(`30Id${id}`);
      this.button40Obj = document.getElementById(`40Id${id}`);
      this.button50Obj = document.getElementById(`50Id${id}`);
      this.buttonDelObj = document.getElementById(`del${id}`)



      this.buttonAlgTypeObj.appendChild(document.createElement("br"));
      this.buttonAlgTypeObj.appendChild(document.createTextNode('Type'));

      this.buttonMinLenObj.appendChild(document.createElement("br"));
      this.buttonMinLenObj.appendChild(document.createTextNode('Length'));

      this.buttonRfObj.appendChild(document.createElement("br"));
      this.buttonRfObj.appendChild(document.createTextNode('Forest'));

      this.buttonLrObj.appendChild(document.createElement("br"));
      this.buttonLrObj.appendChild(document.createTextNode('Regression'));

      this.buttonNbObj.appendChild(document.createElement("br"));
      this.buttonNbObj.appendChild(document.createTextNode('Bayesian'));


      this.button4chObj.addEventListener("click", this.char4Func.bind(this));
      this.button8chObj.addEventListener("click", this.char8Func.bind(this));

      this.buttonAlgTypeObj.addEventListener("click", this.algTypeFunc.bind(this));
      this.buttonMinLenObj.addEventListener("click", this.minLenFunc.bind(this));

      this.buttonRfObj.addEventListener("click", this.ranForFunc.bind(this));
      this.buttonSgdObj.addEventListener("click", this.sgdFunc.bind(this));
      this.buttonLrObj.addEventListener("click", this.logRegFunc.bind(this));
      this.buttonNbObj.addEventListener("click", this.naiveBFunc.bind(this));

      this.button10Obj.addEventListener("click", this.len10Func.bind(this));
      this.button20Obj.addEventListener("click", this.len20Func.bind(this));
      this.button30Obj.addEventListener("click", this.len30Func.bind(this));
      this.button40Obj.addEventListener("click", this.len40Func.bind(this));
      this.button50Obj.addEventListener("click", this.len50Func.bind(this));

      this.buttonDelObj.addEventListener("click", this.deleteGraph.bind(this));


      // Add css
      this.button4chObj.style.cssText = cssButtonSize;
      this.button8chObj.style.cssText = cssButtonSize;

      this.buttonAlgTypeObj.style.cssText = cssButtonSize;
      this.buttonMinLenObj.style.cssText = cssButtonSize;

      this.buttonRfObj.style.cssText = cssButtonSize;
      this.buttonSgdObj.style.cssText = cssButtonSize;
      this.buttonLrObj.style.cssText = cssButtonSize;
      this.buttonNbObj.style.cssText = cssButtonSize;

      this.button10Obj.style.cssText = cssButtonSize;
      this.button20Obj.style.cssText = cssButtonSize;
      this.button30Obj.style.cssText = cssButtonSize;
      this.button40Obj.style.cssText = cssButtonSize;
      this.button50Obj.style.cssText = cssButtonSize;

      this.buttonDelObj.style.cssText = cssButtonSize;
      this.buttonDelObj.setAttribute('class', 'btn btn-danger');


      this.buttonList = [this.button4chObj, this.button8chObj, this.buttonAlgTypeObj, this.buttonMinLenObj, 
        this.buttonRfObj, this.buttonSgdObj, this.buttonLrObj, this.buttonNbObj, this.button10Obj, 
        this.button20Obj, this.button30Obj, this.button40Obj, this.button50Obj]

      this.algButtonList = [this.buttonRfObj, this.buttonSgdObj, this.buttonLrObj, this.buttonNbObj];
      this.lenButtonList = [this.button10Obj, this.button20Obj, this.button30Obj, this.button40Obj, this.button50Obj];

      this.buttonList.forEach((button) => {button.setAttribute("class", 'btn btn-light');})

      if (this.parameters){
        switch(this.parameters['numChar']){
          case '4ch':
            this.char4Func();
            break;
          case '8ch':
            this.char8Func();
            break;
        };
        switch(this.parameters['strucType']){
          case 'algType':
            this.algTypeFunc();

            switch(this.parameters['algType']){
              case 'SGD/SVM':
                this.sgdFunc();
                break;
              case 'Random Forest':
                this.ranForFunc();
                break;
              case 'Naive Bayesian':
                this.naiveBFunc();
                break;
              case 'Logistic Regression':
                this.logRegFunc();
                break;
            };
            break;
          case 'minLen':
            this.minLenFunc();

            switch(this.parameters['length']){
              case '10':
                this.len10Func();
                break;
              case '20':
                this.len20Func();
                break;
              case '30':
                this.len30Func();
                break;
              case '40':
                this.len40Func();
                break;
              case '50':
                this.len50Func();
                break;
          };
          break;
        };
      };
    };

    char4Func(){   this.numCharSelected='4ch'; this.buildPlotAlg(); };
    char8Func(){   this.numCharSelected='8ch'; this.buildPlotAlg(); };

    minLenFunc(){  this.strucTypeSelected='minLen'; console.log(this.strucTypeSelected); this.buildPlotAlg(); };
    algTypeFunc(){ this.strucTypeSelected='algType'; this.buildPlotAlg(); };

    sgdFunc(){     this.algTypeSelected='SGD/SVM';              this.buildPlotAlg(); };
    ranForFunc(){  this.algTypeSelected='Random Forest';        this.buildPlotAlg(); };
    naiveBFunc(){  this.algTypeSelected='Naive Bayesian';       this.buildPlotAlg(); };
    logRegFunc(){  this.algTypeSelected='Logistic Regression';  this.buildPlotAlg(); };

    len10Func(){   this.lengthSelected='10';  this.buildPlotAlg(); };
    len20Func(){   this.lengthSelected='20';  this.buildPlotAlg(); };
    len30Func(){   this.lengthSelected='30';  this.buildPlotAlg(); };
    len40Func(){   this.lengthSelected='40';  this.buildPlotAlg(); };
    len50Func(){   this.lengthSelected='50';  console.log(this.strucTypeSelected); this.buildPlotAlg(); };

    deleteGraph(){  mainDiv.removeChild(document.getElementById(`dashboard${this.id}`)); 
                    graphList[this.id] = null;
                    delete graphList[this.id];
                  };

    buildPlotAlg(){

      this.buttonList.forEach((button) => {button.style.background = ''});
      
      if (this.numCharSelected == '4ch'){
        this.button4chObj.style.background = 'rgb(180, 180, 180)';

      } else if (this.numCharSelected == '8ch'){
        this.button8chObj.style.background = 'rgb(180, 180, 180)';

      };

      if (this.strucTypeSelected == 'algType'){
        var firstParam = this.algTypeSelected;
        var secondParam = lengthList;
        var numOfLines = 5;
        this.buttonAlgTypeObj.style.background = 'rgb(180, 180, 180)';
        this.buttonMinLenObj.style.background = '';

        this.lenButtonList.forEach((button) => {button.style.background = 'rgb(120, 120, 120)'})

        switch (this.algTypeSelected) {
          case 'Random Forest':
            this.buttonRfObj.style.background = 'rgb(180, 180, 180)';
            break;
          case 'Logistic Regression':
            this.buttonLrObj.style.background = 'rgb(180, 180, 180)'
            break;
          case 'SGD/SVM':
            this.buttonSgdObj.style.background = 'rgb(180, 180, 180)'
            break;
          case 'Naive Bayesian':
            this.buttonNbObj.style.background = 'rgb(180, 180, 180)'
            break;
      };

      } else if (this.strucTypeSelected == 'minLen'){
        var firstParam = this.lengthSelected;
        var secondParam = algTypeList;
        var numOfLines = 4;
        this.buttonMinLenObj.style.background = 'rgb(180, 180, 180)';
        this.buttonAlgTypeObj.style.background = '';

        this.algButtonList.forEach((button) => {button.style.background = 'rgb(120, 120, 120)'})

        switch (this.lengthSelected) {
          case '10':
            this.button10Obj.style.background = 'rgb(180, 180, 180)';
            break;
          case '20':
            this.button20Obj.style.background = 'rgb(180, 180, 180)'
            break;
          case '30':
            this.button30Obj.style.background = 'rgb(180, 180, 180)'
            break;
          case '40':
            this.button40Obj.style.background = 'rgb(180, 180, 180)'
            break;
          case '50':
            this.button50Obj.style.background = 'rgb(180, 180, 180)'
            break;
        };

      };

      var bgColor = backgroundColorDecider(this.id);
      var data = [];
      var layout = {
        plot_bgcolor: `rgb(${bgColor},${bgColor},${bgColor})`,
        xaxis: {title: 'Context Weight'},
        yaxis: {range: [0, .6],
                title: 'Score',
                rangemode: 'tozero'},
        title: 'Graph ' + this.id + ': ' + firstParam,
        margin: {
          l: 80,
          r: 80,
          b: 50,
          t: 50,
          pad: 4
        }
      };

      for (let i = 0; i < numOfLines; i++) {
        let loopColor = colorMapper[secondParam[i]]
        data.push(
        {
          y: this.dataSet[this.numCharSelected][this.strucTypeSelected][firstParam][secondParam[i]],
          name: secondParam[i],
          marker: {color: loopColor},
          mode: 'markers'
        }
      );
      };    
    
      Plotly.newPlot(`graphDiv${this.id}`, data, layout);

    };

};

var backgroundColorDecider = function(id){
  let n = id % 8;
  let backgroundColor = 256 - (n * 16);
  return backgroundColor;
}

var data;

var graphList = {};
var graphCount = 1;

var request = new XMLHttpRequest();

request.open('GET', '/data', true);
request.onload = function () {

  // Begin accessing JSON data here
  let jsonData = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data = jsonData;
    insertSideBarText(0)
    graphCount += 1;

  } else {
    console.log('error');
  };
};

request.send();

document.getElementById('newGraph').addEventListener("click", function(){
  graphList[String(graphCount)] = new Graph(data, String(graphCount));
  graphList[String(graphCount)].buildPlotAlg();
  graphCount += 1;
});


var removeAll = function(){
  Object.keys(graphList).forEach((key) => {graphList[key].deleteGraph()});
  graphCount = 1;
};

var testGraphCreation = function(){
  removeAll();
  graphList[String(graphCount)] = new Graph(data, String(graphCount), preset1);
  graphCount += 1;
};

var slider = document.getElementById('slider');

noUiSlider.create(slider, {
  start: 0,
  step: 1,
  behavior: 'none',
	range: {
		'min': 0,
		'max': 5
	}
});

slider.setAttribute('disabled', true);
slider.removeAttribute('title');

var sliderPos = 0;
document.getElementById('sideBarText').innerHTML = sideBarText[String(sliderPos)];

document.getElementById('prevButton').addEventListener('click', function(){
  var sliderPos = slider.noUiSlider.get();
  if (sliderPos > 0){
    sliderPos--;
    slider.noUiSlider.set(sliderPos);
    insertSideBarText(sliderPos)
  };
});

document.getElementById('nextButton').addEventListener('click', function(){
  var sliderPos = slider.noUiSlider.get();
  if (sliderPos < 5){
    sliderPos++;
    slider.noUiSlider.set(sliderPos);
    insertSideBarText(sliderPos)
  };
});

var insertSideBarText = function(sliderPos){
  document.getElementById('sideBarText').innerHTML = '';
  document.getElementById('sideBarText').innerHTML = sideBarText[String(sliderPos)];

  removeAll();

  presets[String(sliderPos)].forEach((preset) => {
    console.log(preset);
    console.log(sliderPos);
    graphList[String(graphCount)] = new Graph(data, String(graphCount), preset);
    graphCount += 1;
  });
};
