# Simple month event calendar (for boostrap 5)
It is a simple month calendar based on boostrap 5 and this calendar can display events. 

![Screenshot main view,](docs/imgs/screenshot-main.png)
## Demo

[Simple demo](https://raw.githack.com/docmcfly/boostrap5EventCalendar/main/docs/demo/index.html)

## An practice example 

I wrote the calendar for another project and tried to make the calendar as universal as possible. The other project is a Typo3 extension for borrowing objects. 
What you can see is the possibility to download events from other months via AJAX. You can see that here: [cyLending/Resources/Private/Partials/Calendar.html](https://github.com/docmcfly/cyLending/blob/main/Resources/Private/Partials/Calendar.html)

Here is the link to my TYPO3 project: [Typo3 extension for object lending](https://github.com/docmcfly/cyLending).

## Instructions

1. Import the important script sources
```html
<!-- imports boostrap 5 -->
<script 
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous">
</script>
<!-- imports jquery -->
<script 
    src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous">
</script>
<!-- imports calendar.js -->
<script 
    src="../../javascript/src/calendar.js">
</script>
```

2. Create the target &lt;div>-tag

```html
<div id="calendar" defer="defer">Calendar</div>
```
Hint: If you do not know, what does "defer" mean? [Defer](https://www.w3schools.com/tags/att_script_defer.asp) ensures that the script is executed at the end of loading. 

3. Render the calendar
   
```js
 new Calendar('#calendar', 'en', {}).renderCalendar([]);
```
#### Parameter:
* "#calendar"  is the &lt;div> tag selector
* "en" is the language (Currently english and german are supported.)
* "{}" can contain additional properties. (by example: you can add a new language or you can change colors.) 
* "[]" is an array with your events. 

### Here is a greater example

```js
  new Calendar('#calendar', 'en', {
      todayBgColor: 'pink', // today color is pink
      texts: {
        en: {
          btnToday: 'Go to today' // change the button text of today
        }
      }
    }).renderCalendar([
      {
        start: '2023-05-23T11:10', // start time of the event
        end: '2023-05-27T17:30',// end time of the event
        title: '🏖️ Hollidays', // the title of the event
        description: 'Tropical island', // a event description
        responsible: 'Mr. Smith', // who is responsible?
        backgroundColor: '#ffcccc',// the background color
      },
      {
        start: '2023-05-15T00:00',
        end: '2023-05-19T00:00',
        title: '🥸 Improtant job',
        description: 'Mow lawn',
        responsible: 'My daddy',
        backgroundColor: '#ccffcc',
        striped: true, // background color is striped?
      },
      {
        start: '2023-05-16',
        end: '2023-05-27T17:30',
        title: '🏴‍☠️ Seize world domination',
        description: 'Top secret',
        responsible: 'The pinky and the brain',
        backgroundColor: '#ccccff',
      },
    ]);
```
