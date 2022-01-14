
function IsPdfGen()
{
  return false;
}



function OnSunburstFinishAnimate()
{
  if ( IsPdfGen() )
     {
       window.setTimeout(function(){ window.print(); }, 0);
     }
}


function FormatTooltip(point)
{ 
  if ( point.noTooltip )
     {
       if ( point.name != '-' )
          {
            return point.name;
          }
       else
          {
            return '';
          }
     }
  else
     {
       if ( point.isNumeric )
          {
            return point.name+': <b>'+point.value+'</b>';
          }
       else
          {
            return point.name+': <b>'+Math.floor(point.value/60)+' min</b>';
          }
     }
}


function CreateSunburstInternal(container_id,data_ar,levels_ar,height_perc,start_angle)
{
  Highcharts.chart(container_id, 
  {
    chart: { height: height_perc?height_perc:'100%', margin:[0,0,0,0] },
    credits: false,
    title: false,
    subtitle: false,
    tooltip: { pointFormatter: function(fmt){ return FormatTooltip(this); } },
    series: 
    [
      {
        type: 'sunburst',
        traverseUpButton: { position: { align: 'right', x: -40, y: 10 }, text: '&lt;&lt;' },
        events: { afterAnimate: function(){ OnSunburstFinishAnimate(); } },
        animation: { duration: IsPdfGen()?0:500 },
        borderColor: '#f0f0f0',
        borderWidth: 2,
        data: data_ar,
        allowDrillToNode: true,
        cursor: 'pointer',
        slicedOffset: 15,
        startAngle: start_angle!=null?start_angle:0,
        levelIsConstant: true,
        dataLabels: { format: '{point.name}', filter: { property: 'innerArcLength', operator: '>', value: 16 } },
        levels: levels_ar
      }
    ]
  });
}		


function CreateSunburst(container_id,data_ar,levels_ar,height_perc,start_angle)
{
   var div = document.createElement('div');
   div.id = container_id;
   div.style.margin = '0 auto';
   if ( IsPdfGen() )
      {
        div.style.width = '1000px';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
      }
   else
      {
        div.style.width = '70%';
        div.style.minWidth = '500px';
        div.style.maxWidth = '2000px';
      }
   document.body.appendChild(div);
   
   CreateSunburstInternal(container_id,data_ar,levels_ar,height_perc,start_angle);
}


var g_levels1 = 
[
  {
    level: 1,
    levelIsConstant: false,
    levelSize: { unit: 'percentage', value: 25 },
    dataLabels: { style: { textOverflow: 'none' }, filter: { property: 'outerArcLength', operator: '>', value: 64 } }
  }, 
  {
     level: 2,
     levelSize: { unit: 'percentage', value: 30 }
  },
  {
     level: 3,
     levelSize: { unit: 'percentage', value: 20 }
  },
  {
     level: 4,
     levelSize: { unit: 'percentage', value: 25 }
  }
];

var g_levels2 = 
[
  {
    level: 1,
    levelIsConstant: false,
    levelSize: { unit: 'percentage', value: 15 },
    dataLabels: { style: { textOverflow: 'none' }, filter: { property: 'outerArcLength', operator: '>', value: 64 } }
  }, 
  {
     level: 2,
     levelSize: { unit: 'percentage', value: 12 }
  },
  {
     level: 3,
     levelSize: { unit: 'percentage', value: 27 },
     colorVariation: { key: 'brightness', to: +0.2 }
  },
  {
     level: 4,
     levelSize: { unit: 'percentage', value: 38 },
     colorVariation: { key: 'brightness', to: -0.2 }
  }
];





function Init(idx)
{
  if ( idx == 1 )
   CreateSunburst('sb1',g_data1,g_levels1,'66%',60);
  else
   CreateSunburst('sb2',g_data2,g_levels2,'100%',20);
}

