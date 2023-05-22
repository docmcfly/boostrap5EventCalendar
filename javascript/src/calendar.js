/*! CylancerCalendar |  GNU GENERAL PUBLIC LICENSE Version 2 */
class Calendar {





    properties = {
        maxEventBoxes: 15,
        todayBgColor: '#ded9a1',
        primaryLightColor: '#d39c8c',
        outOfFocusColor: '#C0C0C0',
        dayBoxHeight: '6.2em',
        formatter: {
            de: {
                date: 'j.n.y',
            },
            en: {
                date: 'm/d/y',
            }
        },
        texts: {
            de: {
                daysOfWeek: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
                daysOfWeekShort: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                btnNextButton: 'Nächster Monat',
                btnPreviousMonth: 'Vorheriger Monat',
                btnToday: 'Heute',
                appointmentsOfTheDay: 'Termine des Tages',
                monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            },
            en: {
                daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                daysOfWeekShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                btnNextButton: 'Next month',
                btnPreviousMonth: 'Previous month',
                btnToday: 'Today',
                appointmentsOfTheDay: 'Appointments of the day',
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            }
        },
    }

    cssStyle() {
        return '\
    :root {\
        --primary-light: '+ this.properties.primaryLightColor + ';\
        --outOfFocus: '+ this.properties.outOfFocusColor + ';\
    }\
    .overflowHidden {\
         overflow: hidden !important;\
         text-overflow: ellipsis !important;\
         white-space: nowrap !important;\
    }\
    div > [data-empty="false"] {\
        cursor: pointer;\
      }\
    .notCurrentMonth{\
    	color: var(--outOfFocus); \
    }\
    .dateBox{\
    	height: '+ this.properties.dayBoxHeight + '; \
    	text-overflow: ellipsis;\
    	overflow: hidden;\
    }\
    [data-eventbox] {\
    	text-overflow: ellipsis;\
        overflow: hidden;\
    	margin: 0;\
    }\
    .today{\
    	background-color: '+ this.properties.todayBgColor + ';\
    }\
    .weekday-5, .weekday-6{\
    	color: var(--bs-primary);\
    }\
    .weekday-5.notCurrentMonth, .weekday-6.notCurrentMonth{\
    	color: var(--primary-light);\
    }'
    }

    today = new Date()
    currentDay = new Date();

    events = []

    constructor(selector, language, properties) {
        this.properties = this.merge(this.properties, properties);
        this.selector = selector
        this.texts = this.merge(this.properties.texts['en'], this.properties.texts[language]);
        this.language = language
    }

    merge(target, ...sources) {
        for (let source of sources) {
            for (let k in source) {
                let vs = source[k], vt = target[k]
                if (Object(vs) == vs && Object(vt) === vt) {
                    target[k] = this.merge(vt, vs)
                    continue
                }
                target[k] = source[k]
            }
        }
        return target
    }

    t() {
        return this.texts
    }

    hasDateFormat(date) {
        return (/^\d{4}-[01]\d-[0-3]\d$/gm).test(date);
    }

    hasTimeFormat(time) {
        return (/^[0-2]\d:[0-5]\d$/gm).test(time)
    }

    hasDateTimeFormat(dateTime) {
        return (/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d$/gm).test(dateTime)
    }

    parseDate(date) {
        if (!this.hasDateFormat(date)) {
            return null;
        }
        let [year, month, day] = date.split("-")
        return new Date(year, month - 1, day, 0, 0, 0)
    }

    parseTime(time) {
        if (!this.hasTimeFormat(time)) {
            return null;
        }
        let [hour, minute] = time.split(":")
        return new Date(1970, 0, 1, hour, minute, 0)
    }

    parseMoment(dateTime) {
        if (this.hasDateFormat(dateTime)) {
            return this.parseDate(dateTime)
        }
        if (!(this.hasDateTimeFormat(dateTime))) {
            return null;
        }
        let [date, _time] = dateTime.split("T")
        let [year, month, day] = date.split("-")
        let [hour, minute] = _time.split(":")
        return new Date(year, month - 1, day, hour, minute, 0)
    }

    equalsDate(date1, date2) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    renderCalendar(events) {
        this.events = events
        let cal = $(this.selector);
        cal.empty();
        let content = ''
        content += '<style>' + this.cssStyle() + '</style>' + "\n";
        content += '<div class="container mb-3">' + "\n";
        content += '    <div class="row mb-3 ">' + "\n";
        content += '        <div class="col-md-3 mb-3">' + "\n";
        content += '            <span class="month-name fs-1">month</span>' + "\n";
        content += '        </div>' + "\n"
        content += '        <div class="col-md-3 mb-3">' + "\n";
        content += '            <button class="btn btn-primary toToday overflowHidden" style="width:100%">' + this.t().btnToday + '</button>' + "\n";
        content += '        </div>' + "\n"
        content += '        <div class="col-md-3 col-sm-6  mb-3">' + "\n";
        content += '            <button class="btn btn-primary previousMonth overflowHidden" style="width:100%">' + this.t().btnPreviousMonth + '</button>' + "\n";
        content += '        </div>' + "\n"
        content += '        <div class="col-md-3 col-sm-6 mb-3">' + "\n";
        content += '            <button class="btn btn-primary nextMonth overflowHidden"  style="width:100%">' + this.t().btnNextButton + '</button> ' + "\n";
        content += '        </div>' + "\n"
        content += '    </div>' + "\n"
        content += '</div>' + "\n"
        content += '<div class="container">'
        content += '    <div class="row mb-3 ">' + "\n";
        content += '        <div class="col-md-9">' + "\n";
        content += '          <div class="container gx-0 month mb-4">' + "\n";
        content += '          </div>' + "\n"
        content += '        </div>' + "\n"
        content += '        <div class="col-md-3 ">' + "\n";
        content += '          <div class="container  gx-0 ">' + "\n";
        content += '            <div class="row mb-3 ">' + "\n";
        content += '                <div class="col "><h2 class="border-top border-bottom p-2">' + this.t().appointmentsOfTheDay + '</h2></div>'
        content += '            </div>' + "\n"
        content += '            <div class="row mb-3 ">' + "\n";
        content += '                <div class="container details ">' + "\n";
        content += '                </div>' + "\n"
        content += '            </div>' + "\n"
        content += '        </div>' + "\n"
        content += '    </div>' + "\n"
        content += '</div>' + "\n"
        cal.append(content)

        $(this.selector + ' .btn.nextMonth').on('click', {calendar: this}, function (event) {
            let calendar = event.data.calendar
            calendar.currentDay.setMonth(calendar.currentDay.getMonth() + 1)
            calendar.renderMonth()

        })
        $(this.selector + ' .btn.previousMonth').on('click', {calendar: this}, function (event) {
            let calendar = event.data.calendar
            calendar.currentDay.setMonth(calendar.currentDay.getMonth() - 1)
            calendar.renderMonth()
        })

        $(this.selector + ' .btn.toToday').on('click', {calendar: this}, function (event) {
            let calendar = event.data.calendar
            calendar.currentDay = new Date()
            calendar.renderMonth()
            $(".today").get(0).scrollIntoView({behavior: 'smooth'});
        })

        this.renderMonth()
    }


    renderMonth() {
        let day = new Date(this.currentDay)
        day.setDate(1)
        day.setDate(day.getDate() - day.getDay() + 1)
        let currentMonth = this.currentDay.getMonth();
        $(this.selector + ' .month-name').text(this.t().monthNames[this.currentDay.getMonth()] + " " + this.currentDay.getFullYear());
        let cal = $(this.selector + ' .month');
        cal.empty();
        let grid = '' // '<div class="container-fluid" style="border: 1px solid red">' + "\n"
        let hide = false;
        for (let i = 0; i < 7; i++) {
            if (i > 1 && ((day.getMonth() > this.currentDay.getMonth() || day.getFullYear() > this.currentDay.getFullYear()) && day.getDay() == 1)) {
                hide = true;
            }
            if (!hide) {

                if (i === 0) {
                    grid += '<div class=" row gx-0 " data-week="' + i + '" >' + "\n"
                    for (let j = 0; j < 7; j++) {
                        grid += '<div class="col border-top d-none d-lg-block '
                        if (j > 0) {
                            grid += 'border-start '
                        }
                        grid += '" data-weekday="' + j + '" data-date="' + this.formatDate(day) + '">';
                        grid += '<div  class=" '
                        grid += 'dayBox px-2 weekday weekday-' + j + '" >'
                        grid += this.t().daysOfWeek[j]

                        grid += '</div></div>' + "\n"
                    }
                    grid += '</div>' + "\n"
                    grid += '<div class=" row gx-0" data-week="' + i + '" >' + "\n"
                    for (let j = 0; j < 7; j++) {
                        grid += '<div class="col border-top d-block d-lg-none '
                        if (j > 0) {
                            grid += 'border-start '
                        }
                        grid += '" data-weekday="' + j + '" data-date="' + this.formatDate(day) + '">';
                        grid += '<div  class=" '
                        grid += ' dayBox px-2 weekday weekday-' + j + '" >'
                        grid += this.t().daysOfWeekShort[j]

                        grid += '</div></div>' + "\n"
                    }
                    grid += '</div>' + "\n"
                } else {
                    grid += '<div class="row gx-0" data-week="' + i + '" >' + "\n"
                    for (let j = 0; j < 7; j++) {
                        grid += '<div class="overflowHidden col border-top  '
                        if (j > 0) {
                            grid += 'border-start '
                        }
                        grid += '" data-weekday="' + j + '" data-date="' + this.formatDate(day) + '">';
                        grid += '<div  class=" '
                        if (this.equalsDate(day, this.today)) {
                            grid += 'today '
                        }
                        if (currentMonth !== day.getMonth()) {
                            grid += 'notCurrentMonth '
                        }
                        grid += 'dateBox weekday-' + j + ' ">'
                        grid += '<span class="px-2">' + day.getDate() + '</span>'
                        day.setDate(day.getDate() + 1)
                        for (let k = 0; k < this.properties.maxEventBoxes; k++) {
                            grid += '<div  data-eventbox="' + k + '">&nbsp;</div>'
                        }
                        grid += '</div></div>' + "\n"
                    }

                    grid += '</div>' + "\n"
                }

            }
        }
        grid += '</div>' + "\n"
        cal.append(grid)

        $(this.selector + ' [data-date]').on('click', {calendar: this}, function (event) {
            event.data.calendar.updateDetails($(this))
        })

        this.renderEvents()
    }

    idealTextColor(bgColor, striped) {
        if (striped === true) {
            return "#000000"
        }
        var nThreshold = 105;
        var components = this.getRGBComponents(bgColor);
        var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

        return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
    }

    getRGBComponents(color) {

        var r = color.substring(1, 3);
        var g = color.substring(3, 5);
        var b = color.substring(5, 7);

        return {
            R: parseInt(r, 16),
            G: parseInt(g, 16),
            B: parseInt(b, 16)
        };
    }

    updateDetails(obj) {
        let d = obj.attr('data-date')
        let details = $(this.selector + ' .details')
        details.empty()
        let dateEvents = $(this.selector + " [data-date='" + d + "'] [data-idx]")
        let add = ''
        let calendar = this
        dateEvents.each(function (i, e) {
            let idx = $(e).attr('data-idx')
            let event = calendar.events[idx]
            let start = calendar.parseMoment(event.start)
            let end = calendar.parseMoment(event.end)
            if (start !== null && end !== null) {

                let backgroundColor = event.backgroundColor
                add += '<div class="mb-2 p-1" style="'
                if (event.striped === true) {
                    add += 'background-image: repeating-linear-gradient(45deg,transparent 0,transparent .5em, ' + backgroundColor + ' .5em, ' + backgroundColor + ' 1em, transparent 1em) ;'
                } else {
                    add += 'background-color:' + backgroundColor + '; '
                }
                add += 'color:' + calendar.idealTextColor(backgroundColor, event.striped) + '; '
                add += '">' + "\n"
                add += '<span class="fw-bold">' + event.title + '</span>'
                add += '<div class="small">'
                if (event.responsible) {
                    add += event.responsible + '<br>'
                }
                if (event.description) {
                    add += event.description
                    add += '&nbsp;('
                }
                let startDate = calendar.formatDate(start);
                let endDate = calendar.formatDate(end);
                if (startDate !== d || endDate !== d
                    || start.getHours() !== 0 || start.getMinutes() !== 0
                    || end.getHours() !== 0 || end.getMinutes() !== 0) {

                    if (startDate !== d || (start.getHours() === 0 || start.getMinutes() === 0)) {
                        add += start.toLocaleDateString(calendar.language) + ' '
                    }
                    if (start.getHours() !== 0 || start.getMinutes() !== 0) {
                        add += calendar.formatTime(start)
                    }
                    add += "&nbsp;-&nbsp;"
                    if (endDate !== d) {
                        add += end.toLocaleDateString(calendar.language) + ' '
                    }
                    if (end.getHours() !== 0 || end.getMinutes() !== 0) {
                        add += calendar.formatTime(end)
                    }
                    if (event.description) {
                        add += ')'
                    }
                }
                add += '</div>' + "\n"
                add += '</div>' + "\n"
            }
        })
        details.append(add)
        $(".details").get(0).scrollIntoView({behavior: 'smooth'});
    }

    renderEvents() {
        let eventsCount = this.events.length
        for (let i = 0; i < eventsCount; i++) {
            this.events[i].idx = i
            this.renderEvent(this.events[i])
        }
    }

    renderEvent(event) {

        let start = this.parseMoment(event.start)
        let end = this.parseMoment(event.end)

        if (start === null || end === null) {
            return;
        }


        // end time is specified and it is 0:00 
        if (event.end.length > 10 && end.getHours() === 0 && end.getMinutes() === 0) {
            end.setDate(end.getDate() - 1) // display the event only to the day before.
        }


        if (start.getTime() > end.getTime()) {
            return;
        }
        let dc = 1;
        let startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        let endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        let tmp = new Date(startDate)
        while (tmp.getTime() !== endDate.getTime()) {
            tmp.setDate(tmp.getDate() + 1)
            dc++
        }

        let row;
        for (let j = 0; j < this.properties.maxEventBoxes; j++) {
            row = j;
            tmp = new Date(startDate)
            let found = true
            for (let i = 0; i < dc; i++) {
                if ($("[data-date='" + this.formatDate(tmp) + "'] [data-eventbox='" + j + "'").attr("data-empty") === "false") {
                    found = false
                    break;
                }
                tmp.setDate(tmp.getDate() + 1)
            }
            if (found) {
                break
            }
        }
        tmp = new Date(startDate)
        for (let i = 0; i < dc; i++) {
            let eventBox = $("[data-date='" + this.formatDate(tmp) + "'] [data-eventbox='" + row + "'")
            if (i == 0) {
                eventBox.text(event.title)
            }
            eventBox.attr('data-empty', 'false')
            eventBox.attr('data-idx', event.idx)
            eventBox.attr('title', event.title)
            if (event.striped === true) {
                eventBox.css("background-image", 'repeating-linear-gradient(45deg,transparent 0,transparent .5em, ' + event.backgroundColor + ' .5em, ' + event.backgroundColor + ' 1em, transparent 1em)')
            } else {
                eventBox.css("background-color", event.backgroundColor)
            }
            eventBox.css("color", this.idealTextColor(event.backgroundColor, event.striped))
            tmp.setDate(tmp.getDate() + 1)
        }



    }

    formatDate(date) {
        return date.getFullYear().toString().padStart(4, '0') + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    }

    formatTime(time) {
        return time.getHours().toString().padStart(2, '0') + ':' + (time.getMinutes()).toString().padStart(2, '0')
    }


}




