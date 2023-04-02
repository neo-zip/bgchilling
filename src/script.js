/*

  https://neotap.net
  made with ❤ from neo

*/

let SETTINGS = [
   {
      name: 'reset all',
      icon: 'M12 20q-3.35 0-5.675-2.325Q4 15.35 4 12q0-3.35 2.325-5.675Q8.65 4 12 4q1.725 0 3.3.713 1.575.712 2.7 2.037V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2Q13.625 6 12 6 9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325Q14.75 20 12 20Z',
      callback: `
         resetSettings();
      `,
   },
   {
      type: 'text',
      name: 'edit text',
      value: 'ビンチリン',
      active_value: 'ビンチリン',
      callback: `
         $('#title').text(this.value);
      `,
   },
   {
      type: 'colorpicker',
      name: 'text color',
      value: '#202020',
      active_value: '#202020',
      callback: `
         $('#title').css('color',this.value);
      `,
   },
   {
      type: 'colorpicker',
      name: 'BG color',
      value: '#202020',
      active_value: '#202020',
      callback: `
         $('.mount').css('background-color',this.value);
      `,
   },
   {
      type: 'file',
      name: 'BG image',
      active_value: 'url()',
      callback: `
         $(this).change(function () {
            const file = this.files[0];
            const reader = new FileReader();
            reader.onloadend = function () {
               $('.mount').css('background-image', 'url(' + reader.result + ')');
            };
            if (file) {
               reader.readAsDataURL(file);
            } else {
               console.error('Wrong file type added.');
            }
         });
      `,
   },
   {
      type: 'dropdown',
      name: 'BG fit',
      value: ['Cover', 'Contain'],
      active_value: 'Cover',
      callback: `
         $('.mount').css('background-size',this.value);
      `,
   },
   {
      type: 'dropdown',
      name: 'BG render',
      value: ['Auto', 'Pixelated'],
      active_value: 'Auto',
      callback: `
         $('.mount').css('image-rendering',this.value);
      `,
   },
   {
      type: 'dropdown',
      name: 'BG repeat',
      value: ['No-Repeat', 'Repeat', 'Round'],
      active_value: 'No-Repeat',
      callback: `
         $('.mount').css('background-repeat',this.value);
      `,
   },
   {
      type: 'toggle',
      name: 'text visibility',
      value: true,
      active_value: true,
      callback: `
         $('.main').fadeToggle(200);
      `,
   },
   {
      type: 'toggle',
      name: 'dropdown icons',
      value: true,
      active_value: false,
      callback: `
         SETTINGS[this.id].value ? $('.icons').css('top','-29px') : $('.icons').css('top','0')
      `,
   },
];

function initSettings() {
   // types: button, text, colorpicker, file, dropdown, toggle

   for (let i = 0; i < SETTINGS.length; i++) {
      const current = SETTINGS[i];
      let event = `onclick="${current.callback}"`;
      let output = `<p>${current.name}</p>`;
      let svg = `
         <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path d="${current.icon}" />
         </svg> 
      `;

      if (current.type == 'text') {
         event = '';
         svg = `
         <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path d="m19.3 8.925-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Z" />
         </svg> 
         `;
         output = `
            <input placeholder="${current.name}..." oninput="${current.callback}" />
         `;
      }
      if (current.type == 'colorpicker') {
         event = '';
         svg = '';
         output = `
            <label>
               <input type="color" oninput="${current.callback}" value="${current.value}" />
               <p>${current.name}</p>
            </label>
         `;
      }
      if (current.type == 'file') {
         event = '';
         svg = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
               <path
                  d="M6 20q-.825 0-1.412-.587Q4 18.825 4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413Q18.825 20 18 20Zm5-4V7.85l-2.6 2.6L7 9l5-5 5 5-1.4 1.45-2.6-2.6V16Z"
               />
            </svg>
         `;
         output = `
            <label>
               <p>${current.name}</p>
               <input type="file" oninput="${current.callback}" />
            </label>
         `;
      }
      if (current.type == 'dropdown') {
         event = '';
         svg = `
         <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5.55 19 2 15.45l1.4-1.4 2.125 2.125 4.25-4.25 1.4 1.425Zm0-8L2 7.45l1.4-1.4 2.125 2.125 4.25-4.25 1.4 1.425ZM13 17v-2h9v2Zm0-8V7h9v2Z"/></svg>
         `;
         output = `
            <p>${current.name}</p>
            <select onchange="${current.callback}">
            ${settingDropdownInit(current.value)}
            </select>
         `;
      }
      if (current.type == 'toggle') {
         event = `data-status="${current.value}" onclick="settingToggle(this); ${current.callback}"`;
         svg = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
               <path
                  d="m10.6 16.2 7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14ZM5 5v14V5Z"
               />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="settings-toggled">
               <path
                  d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14Z"
               />
            </svg>
         `;
      }

      $('.settings').append(`
         <div class="setting" id="${i}" ${event}">
            ${svg}
            ${output}
         </div>
      `);
   }
}

function syncSettings() {
   for (let i = 0; i < SETTINGS.length; i++) {
      const current = SETTINGS[i].active_value;

      console.log(current);
   }
}

function resetSettings() {
   for (let i = 0; i < SETTINGS.length; i++) {
      const current = SETTINGS[i];

      current.active_value = current.value;
   }
}

function settingToggle(e) {
   const s = SETTINGS[$(e)[0].id];
   $(e).children('svg').toggleClass('settings-toggled');
   $(e).children('svg').first().hasClass('settings-toggled') ? (s.value = false) : (s.value = true);
}

function settingDropdownInit(e) {
   let f = '';
   for (let i = 0; i < e.length; i++) {
      f += `<option value="${e[i].toLowerCase()}">${e[i]}</option>`;
   }
   return f;
}

// function saveSettings() {
//    const s = {
//       title: $('#title').text(),
//       text_color: $('#setting-textcolor').val(),
//       bg_color: $('#setting-bgcolor').val(),
//       bg_img: $('#setting-bgupload').val(),
//       bg_fit: $('#setting-bgfit').val(),
//       bg_render: $('#setting-bgrender').val(),
//       s_gradient: $('#setting-gradient').data('status'),
//       s_dropdown: $('#setting-dropdown').data('status'),
//       s_textvisible: $('#setting-textvisible').data('status'),
//    };

//    localStorage.setItem('BGC_data', JSON.stringify(s));
// }

// function loadSettings() {
//    const s = JSON.parse(localStorage.getItem('BGC_data'));

//    $('#title').text(s.title);
//    $('#setting-textcolor').val(s.text_color);
//    $('#setting-bgcolor').val(s.bg_color);
//    $('#setting-bgupload').val(s.bg_img);
//    $('#setting-bgfit').val(s.bg_fit);
//    $('#setting-bgrender').val(s.bg_render);
//    $('#setting-gradient').data('status', s.s_gradient);
//    $('#setting-dropdown').data('status', s.s_dropdown);
//    $('#setting-textvisible').data('status', s.s_textvisible);

//    console.log('Loaded saved settings:', s);
// }

document.addEventListener('keydown', (e) => {
   if (e.key == 'Escape') {
      $('.settings').fadeOut(200);
   }
   if ((e.ctrlKey || e.metaKey) && (e.key == '1' || e.key == ',')) {
      e.preventDefault();
      $('.settings').fadeToggle(200);
   }
   if ((e.ctrlKey || e.metaKey) && e.key == '2') {
      e.preventDefault();
      console.log('Painting not implemented.');
   }
   if ((e.ctrlKey || e.metaKey) && e.key == '3') {
      e.preventDefault();
      console.log('Weather not implemented.');
   }
   if ((e.ctrlKey || e.metaKey) && e.key == '4') {
      e.preventDefault();
      console.log('Music not implemented.');
   }
});

initSettings();
syncSettings();

// let toggleGradient = true;
// function settingToggleGradient() {
//    if (toggleGradient) {
//       $('#title').css('color', 'var(--text-h1)');
//    } else {
//       $('#title').css('color', 'transparent');
//    }
//    toggleGradient = !toggleGradient;
// }

// loadSettings();

// setInterval(() => {
//    if ($('.settings').css('display') == 'block') {
//       saveSettings();
//    }
// }, 1000);

// let time = false;

// function setDate() {
//    const d = new Date();
//    let h = d.getHours();
//    let m = d.getMinutes();
//    let tm = [
//       'january',
//       'february',
//       'march',
//       'april',
//       'may',
//       'june',
//       'july',
//       'august',
//       'september',
//       'october',
//       'november',
//       'december',
//    ][d.getMonth()];
//    let td = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][d.getDay()];

//    h = h % 12 < 10 ? '' + (h % 12) : h % 12;
//    m = m < 10 ? '0' + m : m;

//    if (time) {
//       $('#date').removeClass('swipe-out');
//       $('#date').addClass('swipe-in');
//    } else {
//       $('#date').removeClass('swipe-in');
//       $('#date').addClass('swipe-out');
//    }

//    $('#date').text(td + ',  ' + tm + ' ' + d.getDate());
//    $('#time').text(h + ':' + m);
//    setTimeout(date, 500);
// }
// date();

// $('#title').on('click', function () {
//    time = time ? false : true;
// });
