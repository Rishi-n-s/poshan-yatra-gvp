const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. New Form HTML
const oldFormStart = '    <div class="mut" id="mem" style="margin:4px 0 10px"></div>';
const oldFormEnd = '<div class="ph" id="myph"></div>';

const idxStart = html.indexOf(oldFormStart);
const idxEnd = html.indexOf(oldFormEnd);

if (idxStart === -1 || idxEnd === -1) {
  console.error("Could not find form block boundaries!", idxStart, idxEnd);
  process.exit(1);
}

const newFormHtml = `    <div class="mut" id="mem" style="margin:4px 0 10px"></div>

    <!-- Student & Mentor Header Details (From Official Gujarat Vidyapith Form) -->
    <div style="background:#fdf6ed;border:1px solid #f9d8b3;border-radius:8px;padding:12px;margin-bottom:14px">
     <div style="font-weight:700;color:#854d0e;margin-bottom:8px;font-size:13px">📋 વિદ્યાર્થી અને ટીમ વિગત (Student & Team Info)</div>
     <div class="row">
      <div>
       <label>વિદ્યાર્થીનું નામ (Student Name)</label>
       <select id="f_student" style="width:100%"><option value="">-- વિદ્યાર્થી પસંદ કરો --</option></select>
      </div>
      <div>
       <label>અભ્યાસક્રમ / વિભાગ (Course / Dept)</label>
       <input id="f_course" placeholder="e.g. M.S.W. / M.A. / B.A.">
      </div>
      <div>
       <label>માર્ગદર્શક (Mentor / Guide)</label>
       <input id="f_mentor" placeholder="માર્ગદર્શક અધ્યાપકનું નામ">
      </div>
     </div>
     <div class="row" style="margin-top:8px">
      <div><label>દિવસ (Day)</label><select id="fday"></select></div>
      <div><label>તારીખ (Date)</label><input type="date" id="fd"></div>
     </div>
    </div>

    <!-- Anganwadi Visit Details (Green Box matching Word Document Table 1) -->
    <div style="background:#f4fbf4;border:1px solid #c8e6c9;border-left:4px solid #2e7d32;border-radius:8px;padding:12px;margin:12px 0">
     <h4 style="margin:0 0 10px;color:#1b5e20;display:flex;align-items:center;gap:6px;font-size:14px">
      <span>🏡</span> ૧. આંગણવાડીની વિગતો (Anganwadi Visit Details)
     </h4>
     <div class="row">
      <div style="flex:2"><label>આંગણવાડીનું નામ</label><input id="ang_name" placeholder="આંગણવાડીનું નામ / કેન્દ્ર"></div>
      <div><label>વિસ્તાર / એરિયા</label><input id="ang_area" placeholder="વિસ્તાર / સોસાયટી / વોર્ડ"></div>
      <div><label>ગામ</label><input id="ang_village" placeholder="ગામ"></div>
     </div>
     <div class="row" style="margin-top:6px">
      <div style="flex:2"><label>આંગણવાડી કાર્યકરનું નામ</label><input id="ang_worker" placeholder="કાર્યકર / તેડાગર બહેનનું નામ"></div>
      <div><label>નોંધાયેલા બાળકો</label><input id="ang_enrolled" type="number" min="0" placeholder="કુલ સંખ્યા"></div>
      <div><label>હાજર બાળકો</label><input id="ang_present" type="number" min="0" placeholder="હાજર સંખ્યા"></div>
      <div><label>હાજર આંગણવાડી કાર્યકરો/સ્ટાફ</label><input id="ang_staff" type="number" min="0" placeholder="હાજર સ્ટાફ"></div>
     </div>
    </div>

    <!-- School Visit Details (Blue Box matching Word Document Table 1) -->
    <div style="background:#f0f7ff;border:1px solid #bbdefb;border-left:4px solid #1565c0;border-radius:8px;padding:12px;margin:12px 0">
     <h4 style="margin:0 0 10px;color:#0d47a1;display:flex;align-items:center;gap:6px;font-size:14px">
      <span>🏫</span> ૨. શાળાની વિગતો (School Visit Details)
     </h4>
     <div class="row">
      <div style="flex:2"><label>શાળાનું નામ</label><input id="fs" placeholder="શાળાનું નામ (School Name)"></div>
      <div>
       <label>શાળાનો પ્રકાર</label>
       <select id="fst">
         <option value="">-- Choose School Type --</option>
         <option value="school-primary">school-primary</option>
         <option value="school-secondary">school-secondary</option>
         <option value="school-hs">school-hs</option>
         <option value="anganvadi">anganvadi</option>
         <option value="social-group">social-group</option>
       </select>
      </div>
     </div>
     <div class="row" style="margin-top:6px">
      <div><label>શાળાનો વિસ્તાર / ગામ</label><input id="fp" placeholder="વિસ્તાર, ગામ, તાલુકો"></div>
      <div><label>શિક્ષક / આચાર્યનું નામ</label><input id="fpn" placeholder="આચાર્ય / મુખ્યાધ્યાપકનું નામ"></div>
      <div><label>સંપર્ક મોબાઈલ નંબર</label><input id="fpc" type="tel" placeholder="Mobile number"></div>
     </div>
     <div class="row" style="margin-top:6px">
      <div><label>નોંધાયેલા વિદ્યાર્થીઓ</label><input id="sch_enrolled" type="number" min="0" placeholder="કુલ વિદ્યાર્થી"></div>
      <div><label>હાજર વિદ્યાર્થીઓ</label><input id="sch_present" type="number" min="0" placeholder="હાજર સંખ્યા"></div>
      <div><label>હાજર શિક્ષકો</label><input id="sch_teachers" type="number" min="0" placeholder="હાજર શિક્ષકો"></div>
     </div>
    </div>

    <div class="mut" id="gpsl" style="margin:8px 0 4px"></div>

    <!-- Activities & Narrative Report -->
    <div style="background:#fafafa;border:1px solid #e5e7eb;border-radius:8px;padding:12px;margin:12px 0">
     <h4 style="margin:0 0 10px;color:#374151;font-size:14px">📝 ૩. દૈનિક પ્રવૃત્તિઓ અને અહેવાલ (Activities & Day Report)</h4>
     <label>Activity 1</label><input class="act" placeholder="e.g. Morning Assembly & Poshan Oath">
     <label>Activity 2</label><input class="act" placeholder="e.g. Nutrition Rally in Village / Handwashing demo">
     <label>Activity 3</label><input class="act" placeholder="e.g. Height & Weight Measurement / BMI check">
     <label>Activity 4</label><input class="act" placeholder="e.g. Poshan Dish Demonstration / Bal Aahar">
     <label>Activity 5</label><input class="act" placeholder="e.g. Drama / Street Play on Healthy Diet">
     <label style="margin-top:8px">દૈનિક વિગતવાર અહેવાલ (Day report)</label>
     <textarea id="fr" rows="5" placeholder="દિવસ દરમિયાન થયેલ પ્રવૃત્તિઓ, લોકભાગીદારી, અવલોકનો અને પરિણામોનું વિગતવાર વર્ણન લખો."></textarea>
     <p class="mut" style="margin:5px 0 0"><button class="btn alt" type="button" id="voiceReport" style="padding:6px 10px;min-height:0">🎙️ Speak report (બોલીને અહેવાલ લખો)</button> <span id="voiceStatus"></span></p>
    </div>

    <p style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
     <button class="btn" id="save" style="font-size:15px;padding:10px 18px">💾 Save day report (અહેવાલ સાચવો)</button>
     <button class="btn alt" type="button" id="newVisitBtn" title="Clear form to record a second school visit on the same day as a NEW separate entry">➕ New Visit (બીજી મુલાકાત)</button>
     <button class="btn alt" type="button" id="delRepBtn" style="color:#d32f2f;border-color:#d32f2f">🗑️ Delete Day Report</button>
     <span class="mut" id="sv" style="margin-left:10px"></span>
    </p>
   </div>
   
   <h2>Photographs <span class="mut" id="pc"></span></h2>
   <div class="note">Photos taken or uploaded here are automatically stamped with the official Gujarat Vidyapith watermark, date-time, GPS coordinates, place name, team, and group. Fill place details first.</div>
   <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:10px 0">
    <button class="btn" id="snap" type="button">📷 Open camera</button>
    <label for="galleryUpload" id="lblGalleryUpload" class="btn alt" style="margin:0;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
     📁 Upload from device
     <input id="galleryUpload" type="file" accept="image/*,.jpg,.jpeg,.png,.webp" multiple style="display:none">
    </label>
    <span class="mut" id="galleryStatus" style="font-size:12px"></span>
   </div>
   <div class="ph" id="myph"></div>`;

html = html.slice(0, idxStart) + newFormHtml + html.slice(idxEnd + oldFormEnd.length);
fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully updated form HTML in index.html!");

