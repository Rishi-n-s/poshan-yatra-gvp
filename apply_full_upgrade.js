const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// ==========================================
// 1. UPDATE FORM HTML
// ==========================================
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

// ==========================================
// 2. UPDATE DASHBOARD GALLERY RENDERING
// ==========================================
const oldDashGal = '<h2>Photo gallery (${P.length} photos)</h2>';
if (html.includes(oldDashGal)) {
  const dashGalBlockOld = `<h2>Photo gallery (\${P.length} photos)</h2>
  <div class="ph">\${P.slice(-48).reverse().map(p=>\`<img src="\${esc(p.url)}" loading="lazy" alt="\${esc(p.r.school)}" data-u="\${esc(p.url)}">\`).join("")||'<span class="mut">No photos yet. Use Team entry to snap photos.</span>'}</div>`;
  
  const dashGalBlockNew = `// Deduplicate gallery photos by URL so no duplicate photo ever appears side-by-side
  const seenPhotoUrls = new Set();
  const uniqueP = [];
  for (const p of P) {
    if (p && p.url && !seenPhotoUrls.has(p.url)) {
      seenPhotoUrls.add(p.url);
      uniqueP.push(p);
    }
  }

  <h2>Photo gallery (\${uniqueP.length} photos)</h2>
  <div class="ph">\${uniqueP.slice(-60).reverse().map(p=>\`<img src="\${esc(p.url)}" loading="lazy" alt="\${esc(p.r.school||p.r.anganwadi_name||'Photo')}" onerror="this.style.display='none'" data-u="\${esc(p.url)}">\`).join("")||'<span class="mut">No photos yet. Use Team entry to snap photos.</span>'}</div>`;
  
  html = html.replace(dashGalBlockOld, dashGalBlockNew);
}

// ==========================================
// 3. UPDATE EXCEL FUNCTIONS (EXACT WORD DOC MATCH)
// ==========================================
const excelStartTag = '/* ---------- 1. Excel Export WITH Embedded Photos ---------- */';
const excelEndTag = '/* ---------- Login & Entry ---------- */';

const eStart = html.indexOf(excelStartTag);
const eEnd = html.indexOf(excelEndTag);

if (eStart === -1 || eEnd === -1) {
  console.error("Could not find Excel block boundaries!", eStart, eEnd);
  process.exit(1);
}

const replacementExcelCode = `/* ---------- Official Report Card Sheet Generator (Matches Word Document) ---------- */
async function buildOfficialReportCardSheet(wb, rs, withPhotos){
 const ws = wb.addWorksheet("દૈનિક નોંધ ફોર્મ (Daily Report)");
 
 // Title Rows
 ws.mergeCells("A1:N1");
 const t1 = ws.getCell("A1");
 t1.value = "ગુજરાત વિદ્યાપીઠ, અમદાવાદ | પોષણ યાત્રા – ૨૦૨૬";
 t1.font = { name: "Segoe UI", size: 16, bold: true, color: { argb: "FF6A1B29" } };
 t1.alignment = { horizontal: "center", vertical: "middle" };
 ws.getRow(1).height = 32;

 ws.mergeCells("A2:N2");
 const t2 = ws.getCell("A2");
 t2.value = "વિદ્યાર્થીનું દૈનિક સ્થળવાર નોંધ ફોર્મ (૨૬ થી ૩૧ ઑક્ટોબર ૨૦૨૬)";
 t2.font = { name: "Segoe UI", size: 12, bold: true, color: { argb: "FF2B3E50" } };
 t2.alignment = { horizontal: "center", vertical: "middle" };
 ws.getRow(2).height = 24;

 // Header Info Row 3
 ws.mergeCells("A3:D3");
 ws.mergeCells("E3:G3");
 ws.mergeCells("H3:J3");
 ws.mergeCells("K3:N3");

 const activeTeam = fT ? (TEAMS.find(t=>t.t===fT)||TEAMS[0]) : (me ? T(me) : TEAMS[0]);
 const sampleReport = rs.find(r=>r.student_name || r.student_course) || rs[0] || {};
 const sName = sampleReport.student_name || (activeTeam && activeTeam.m.length ? activeTeam.m.map(m=>m.split("|")[0]).join(", ") : "");
 const sCourse = sampleReport.student_course || (activeTeam && activeTeam.m.length ? activeTeam.m[0].split("|")[1]||"" : "");
 const sMentor = sampleReport.mentor_name || "ગુજરાત વિદ્યાપીઠ માર્ગદર્શક અધ્યાપક";
 const sTeam = activeTeam ? activeTeam.n + " (" + activeTeam.t + ")" : "Group G-051 (Gir Somnath)";

 ws.getCell("A3").value = "વિદ્યાર્થીનું નામ: " + sName;
 ws.getCell("E3").value = "અભ્યાસક્રમ/વિભાગ: " + sCourse;
 ws.getCell("H3").value = "ટીમ નં.: " + sTeam;
 ws.getCell("K3").value = "માર્ગદર્શક: " + sMentor;

 [ws.getCell("A3"), ws.getCell("E3"), ws.getCell("H3"), ws.getCell("K3")].forEach(c => {
  c.font = { name: "Segoe UI", size: 10, bold: true };
  c.alignment = { vertical: "middle", wrapText: true };
 });
 ws.getRow(3).height = 22;

 // Spacing Row 4
 ws.getRow(4).height = 8;

 // Table 1: Main Place-wise Daily Records (Soft Green Header matching Word doc!)
 const t1Headers = [
  "તારીખ\\n(Date)",
  "આંગણવાડીનું નામ\\n(Anganwadi Name)",
  "વિસ્તાર / એરિયા\\n(Area / Ward)",
  "ગામ\\n(Village)",
  "આંગણવાડી કાર્યકરનું નામ\\n(Worker Name)",
  "નોંધાયેલા બાળકો\\n(Enrolled Children)",
  "હાજર બાળકો\\n(Present Children)",
  "હાજર આંગણવાડી\\nકાર્યકરો / કર્મચારીઓ",
  "શાળાનું નામ\\n(School Name)",
  "શાળાનો વિસ્તાર / ગામ\\n(School Village)",
  "શિક્ષક / આચાર્યનું નામ\\n(Principal / Teacher)",
  "નોંધાયેલા વિદ્યાર્થીઓ\\n(Enrolled Students)",
  "હાજર વિદ્યાર્થીઓ\\n(Present Students)",
  "હાજર શિક્ષકો\\n(Present Teachers)"
 ];
 if(withPhotos){
  t1Headers.push("ફોટોગ્રાફ્સ (Photographs)");
 }

 const r5 = ws.getRow(5);
 r5.values = t1Headers;
 r5.height = 38;
 r5.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
 r5.font = { name: "Segoe UI", size: 9.5, bold: true, color: { argb: "FF1E4620" } };
 for(let col=1; col<=t1Headers.length; col++){
  const c = r5.getCell(col);
  c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD5E8D4" } }; // Soft green from Word doc!
  c.border = {
   top: {style: "thin", color: {argb: "FF82B366"}},
   left: {style: "thin", color: {argb: "FF82B366"}},
   bottom: {style: "medium", color: {argb: "FF82B366"}},
   right: {style: "thin", color: {argb: "FF82B366"}}
  };
 }

 const colWidths = [14, 24, 18, 16, 22, 14, 13, 20, 26, 20, 22, 14, 13, 13];
 if(withPhotos) colWidths.push(32);
 colWidths.forEach((w, i) => { ws.getColumn(i+1).width = w; });

 const dates = [
  { day: 1, dateStr: "૨૬-૧૦-૨૦૨૬", iso: "2026-10-26" },
  { day: 2, dateStr: "૨૭-૧૦-૨૦૨૬", iso: "2026-10-27" },
  { day: 3, dateStr: "૨૮-૧૦-૨૦૨૬", iso: "2026-10-28" },
  { day: 4, dateStr: "૨૯-૧૦-૨૦૨૬", iso: "2026-10-29" },
  { day: 5, dateStr: "૩૦-૧૦-૨૦૨૬", iso: "2026-10-30" },
  { day: 6, dateStr: "૩૧-૧૦-૨૦૨૬", iso: "2026-10-31" }
 ];

 let currRow = 6;
 const dailySummary = {};
 dates.forEach(d => {
  dailySummary[d.iso] = {
   dateStr: d.dateStr,
   angCount: 0,
   angPresent: 0,
   angStaff: 0,
   schCount: 0,
   schPresent: 0,
   schTeachers: 0
  };
 });

 for(const d of dates){
  const matching = rs.filter(r => (r.date === d.iso) || (+r.day === d.day));
  if(matching.length === 0){
   const row = ws.getRow(currRow++);
   row.values = [d.dateStr, "", "", "", "", "", "", "", "", "", "", "", "", ""];
   row.height = 24;
   row.alignment = { vertical: "middle", horizontal: "center" };
   for(let col=1; col<=14; col++){
    row.getCell(col).border = { top: {style:"thin",color:{argb:"FFE0E0E0"}}, bottom: {style:"thin",color:{argb:"FFE0E0E0"}}, left: {style:"thin",color:{argb:"FFE0E0E0"}}, right: {style:"thin",color:{argb:"FFE0E0E0"}} };
   }
  }else{
   for(const r of matching){
    const row = ws.getRow(currRow++);
    const isAng = (r.school_type === 'anganvadi') || (r.anganwadi_name && !r.school);
    const angName = r.anganwadi_name || (isAng ? r.school : "");
    const angArea = r.anganwadi_area || "";
    const angVillage = r.anganwadi_village || (isAng ? r.address : "");
    const angWorker = r.anganwadi_worker || (isAng ? r.cname : "");
    const angEnrolled = r.anganwadi_enrolled != null ? r.anganwadi_enrolled : "";
    const angPresent = r.anganwadi_present != null ? r.anganwadi_present : "";
    const angStaff = r.anganwadi_staff != null ? r.anganwadi_staff : "";

    const schName = !isAng ? r.school : "";
    const schArea = !isAng ? r.address : "";
    const schTeacher = !isAng ? r.cname : "";
    const schEnrolled = r.school_enrolled != null ? r.school_enrolled : "";
    const schPresent = r.school_present != null ? r.school_present : "";
    const schTeachers = r.school_teachers_present != null ? r.school_teachers_present : "";

    const s = dailySummary[d.iso];
    if(s){
     if(angName) s.angCount++;
     if(angPresent) s.angPresent += +angPresent;
     if(angStaff) s.angStaff += +angStaff;
     if(schName) s.schCount++;
     if(schPresent) s.schPresent += +schPresent;
     if(schTeachers) s.schTeachers += +schTeachers;
    }

    row.values = [
     d.dateStr,
     angName,
     angArea,
     angVillage,
     angWorker,
     angEnrolled,
     angPresent,
     angStaff,
     schName,
     schArea,
     schTeacher,
     schEnrolled,
     schPresent,
     schTeachers
    ];
    row.height = withPhotos && (r.photos||[]).length ? 85 : 26;
    row.alignment = { vertical: "middle", wrapText: true };
    row.getCell(1).alignment = { vertical: "middle", horizontal: "center" };
    [6,7,8, 12,13,14].forEach(c => row.getCell(c).alignment = { vertical: "middle", horizontal: "center" });

    for(let col=1; col<=14; col++){
     row.getCell(col).border = { top: {style:"thin",color:{argb:"FFCCCCCC"}}, bottom: {style:"thin",color:{argb:"FFCCCCCC"}}, left: {style:"thin",color:{argb:"FFCCCCCC"}}, right: {style:"thin",color:{argb:"FFCCCCCC"}} };
    }

    if(withPhotos && r.photos && r.photos.length > 0){
     try{
      const p = r.photos[0];
      const imgData = await getPhotoBuffer(p.url);
      if(imgData && imgData.buffer){
       const imgId = wb.addImage({ buffer: imgData.buffer, extension: imgData.extension });
       ws.addImage(imgId, {
        tl: { col: 14.1, row: row.number - 1 + 0.1 },
        ext: { width: 120, height: 75 }
       });
      }
     }catch(e){}
    }
   }
  }
 }

 currRow++;
 const titleT2Row = ws.getRow(currRow++);
 titleT2Row.getCell(1).value = "દૈનિક કુલ નોંધ (દરેક તારીખ માટે આંકડા ઉમેરો):";
 titleT2Row.getCell(1).font = { name: "Segoe UI", size: 11, bold: true, color: { argb: "FF0B5394" } };
 titleT2Row.height = 24;

 const t2Headers = [
  "તારીખ\\n(Date)",
  "મુલાકાત લીધેલી\\nઆંગણવાડીઓ",
  "આંગણવાડીમાં\\nહાજર બાળકો",
  "હાજર આંગણવાડી\\nકાર્યકરો",
  "મુલાકાત લીધેલી\\nશાળાઓ",
  "શાળામાં હાજર\\nવિદ્યાર્થીઓ",
  "હાજર શિક્ષકો"
 ];
 const t2HeaderRow = ws.getRow(currRow++);
 t2HeaderRow.values = t2Headers;
 t2HeaderRow.height = 36;
 t2HeaderRow.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
 t2HeaderRow.font = { name: "Segoe UI", size: 9.5, bold: true, color: { argb: "FF0B5394" } };
 for(let col=1; col<=t2Headers.length; col++){
  const c = t2HeaderRow.getCell(col);
  c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFCFE2F3" } }; // Soft Blue from Word doc!
  c.border = {
   top: {style: "thin", color: {argb: "FF6C8EBF"}},
   left: {style: "thin", color: {argb: "FF6C8EBF"}},
   bottom: {style: "medium", color: {argb: "FF6C8EBF"}},
   right: {style: "thin", color: {argb: "FF6C8EBF"}}
  };
 }

 for(const d of dates){
  const s = dailySummary[d.iso] || { dateStr: d.dateStr, angCount: 0, angPresent: 0, angStaff: 0, schCount: 0, schPresent: 0, schTeachers: 0 };
  const row = ws.getRow(currRow++);
  row.values = [
   s.dateStr,
   s.angCount || "",
   s.angPresent || "",
   s.angStaff || "",
   s.schCount || "",
   s.schPresent || "",
   s.schTeachers || ""
  ];
  row.height = 22;
  row.alignment = { vertical: "middle", horizontal: "center" };
  for(let col=1; col<=t2Headers.length; col++){
   row.getCell(col).border = { top: {style:"thin",color:{argb:"FFCCDDEE"}}, bottom: {style:"thin",color:{argb:"FFCCDDEE"}}, left: {style:"thin",color:{argb:"FFCCDDEE"}}, right: {style:"thin",color:{argb:"FFCCDDEE"}} };
  }
 }
}

/* ---------- 1. Excel Export WITH Embedded Photos ---------- */
async function excelWithPhotos(){
 if(typeof ExcelJS==="undefined"){
  toast("Excel library is loading, please try again in a moment.");return;
 }
 const rs=reports.filter(r=>(!fT||r.taluka==fT)&&(!fD||r.day==fD)).sort((a,b)=>a.day-b.day||a.team.localeCompare(b.team));
 const totalPhotos=rs.reduce((n,r)=>n+np(r),0);
 toast("Preparing Excel with photos… 0/"+totalPhotos);

 const wb=new ExcelJS.Workbook();
 wb.creator="Gujarat Vidyapith - Poshan Yatra 2026";
 wb.created=new Date();

 const hd=(w)=>{
  const r=w.getRow(1);
  r.font={bold:true,color:{argb:"FFFFFFFF"},size:11};
  r.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF8B1E2D"}};
  r.alignment={vertical:"middle",horizontal:"center",wrapText:true};
  r.height=28;
  w.views=[{state:"frozen",ySplit:1}];
 };

 // Sheet 1: Official Report Card matching user's Word document
 await buildOfficialReportCardSheet(wb, rs, true);

 // Sheet 2: Day-wise Reports (with thumbnail columns)
 const photoCols=Array.from({length:10},(_,i)=>"Photo "+(i+1));
 const s2Headers=["Day","Date","Taluka","Team","School / Place","Address","Contact Person","Contact Number","Activity 1","Activity 2","Activity 3","Activity 4","Activity 5",...photoCols,"GPS"];
 const s2=wb.addWorksheet("Day-wise Reports");
 s2.columns=s2Headers.map((h,i)=>({
  header:h,
  width:i>=13&&i<23?22:i>=8&&i<13?26:16
 }));
 hd(s2);

 // Sheet 3: Photographs Gallery (High-Res Photos Sheet)
 const s3=wb.addWorksheet("Photographs Gallery");
 s3.columns=[
  {header:"Day",width:10},
  {header:"Team",width:18},
  {header:"School / Place",width:28},
  {header:"Contact Person",width:20},
  {header:"Contact Number",width:16},
  {header:"Photo #",width:8},
  {header:"Time & GPS",width:28},
  {header:"Photograph",width:50}
 ];
 hd(s3);

 let processed=0,failCount=0;

 for(const r of rs){
  const acts=r.acts||[];
  const row=s2.addRow([
   "Day "+r.day,r.date||"",r.taluka||"",r.team||"",r.school||"",r.address||"",
   r.cname||"",r.cphone||"",acts[0]||"",acts[1]||"",acts[2]||"",acts[3]||"",acts[4]||"",
   ...Array(10).fill(""),r.gps||""
  ]);
  row.alignment={vertical:"top",wrapText:true};

  const dayPhotos=r.photos||[];
  if(dayPhotos.length>0)row.height=95;

  for(let i=0;i<dayPhotos.length;i++){
   const p=dayPhotos[i];
   const imgData=await getPhotoBuffer(p.url);
   processed++;
   if(totalPhotos>0)toast("Processing photo "+processed+"/"+totalPhotos);
   
   if(imgData&&imgData.buffer){
    try{
     const imgId=wb.addImage({
      buffer:imgData.buffer,
      extension:imgData.extension
     });
     
     const thumbHeight=Math.round(110*imgData.h/imgData.w);
     s2.addImage(imgId,{
      tl:{col:13+i+0.05,row:row.number-1+0.05},
      ext:{width:140,height:Math.min(105,thumbHeight)}
     });

     const galRow=s3.addRow([
      "Day "+r.day,r.team||"",r.school||r.anganwadi_name||"",r.cname||r.anganwadi_worker||"",r.cphone||"",
      (i+1),((p.time||"")+" · "+(p.gps||"")),""
     ]);
     galRow.alignment={vertical:"middle",wrapText:true};
     const galHeight=Math.round(240*imgData.h/imgData.w);
     galRow.height=Math.max(160,galHeight*0.75+10);
     s3.addImage(imgId,{
      tl:{col:7.05,row:galRow.number-1+0.05},
      ext:{width:320,height:Math.min(240,galHeight)}
     });
    }catch(err){
     console.warn("Failed embedding image:", err);
     failCount++;
    }
   }else{
    failCount++;
   }
  }
 }

 // Sheet 4: Student Roster
 const s4=wb.addWorksheet("Student Roster");
 s4.columns=[
  {header:"Taluka",width:14},
  {header:"Team",width:20},
  {header:"#",width:6},
  {header:"Student Name",width:32},
  {header:"Programme / Department",width:26}
 ];
 TEAMS.forEach(t=>t.m.forEach((m,i)=>{
  const[n,p]=m.split("|");
  s4.addRow([t.t,t.n,i+1,n,p]);
 }));
 hd(s4);

 wb.views=[{activeTab:0,firstSheet:0,visibility:"visible",x:0,y:0,width:20000,height:10000}];
 
 try{
  const buffer=await wb.xlsx.writeBuffer();
  const blob=new Blob([buffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
  const filename="PoshanYatra_ReportCard_WithPhotos_"+today()+".xlsx";
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download=filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(a.href),2000);
  toast(failCount?"Excel with photos downloaded! ("+failCount+" photo could not be embedded)":"Excel with photos downloaded successfully! ✓");
 }catch(e){
  toast("Download failed: "+(e.message||e));
 }
}

/* ---------- 2. Excel Form Only (Instant, Exact Word Document Match) ---------- */
async function excelFormOnly(){
 if(typeof ExcelJS==="undefined"){
  toast("Excel library is loading, please try again in a moment.");return;
 }
 toast("Generating official Excel report card…");
 const rs=reports.filter(r=>(!fT||r.taluka==fT)&&(!fD||r.day==fD)).sort((a,b)=>a.day-b.day||a.team.localeCompare(b.team));

 const wb=new ExcelJS.Workbook();
 wb.creator="Gujarat Vidyapith - Poshan Yatra 2026";
 wb.created=new Date();

 // Sheet 1: Exact Official Report Card
 await buildOfficialReportCardSheet(wb, rs, false);

 // Sheet 2: Student Roster
 const s2=wb.addWorksheet("Student Roster");
 s2.columns=[
  {header:"Taluka",width:14},
  {header:"Team",width:20},
  {header:"#",width:6},
  {header:"Student Name",width:32},
  {header:"Programme / Department",width:26}
 ];
 TEAMS.forEach(t=>t.m.forEach((m,i)=>{
  const[n,p]=m.split("|");
  s2.addRow([t.t,t.n,i+1,n,p]);
 }));
 const r=s2.getRow(1);
 r.font={bold:true,color:{argb:"FFFFFFFF"},size:11};
 r.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF8B1E2D"}};
 r.alignment={vertical:"middle",horizontal:"center",wrapText:true};
 r.height=28;

 wb.views=[{activeTab:0,firstSheet:0,visibility:"visible",x:0,y:0,width:20000,height:10000}];

 try{
  const buffer=await wb.xlsx.writeBuffer();
  const blob=new Blob([buffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
  const filename="PoshanYatra_ReportCard_Form_"+today()+".xlsx";
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download=filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(a.href),2000);
  toast("Official Excel Form downloaded successfully! ✓");
 }catch(e){
  toast("Download failed: "+(e.message||e));
 }
}

`;

html = html.slice(0, eStart) + replacementExcelCode + html.slice(eEnd);

// ==========================================
// 4. UPDATE showForm(), loadCur(), saveRep()
// ==========================================

// In showForm:
const oldShowFormMem = `  $("#mem").textContent="Members: "+t.m.map(m=>m.split("|")[0]).join(", ");`;
const newShowFormMem = `  $("#mem").textContent="Members: "+t.m.map(m=>m.split("|")[0]).join(", ");
  
  // Populate student dropdown from team members
  const stSel = $("#f_student");
  if(stSel && t && t.m){
   stSel.innerHTML = '<option value="">-- વિદ્યાર્થી પસંદ કરો (Select Student) --</option>' +
    t.m.map(m => {
     const parts = m.split("|");
     const name = parts[0].trim();
     const course = (parts[1] || "").trim();
     return \`<option value="\${esc(name)}" data-course="\${esc(course)}">\${esc(name)}\${course ? ' (' + esc(course) + ')' : ''}</option>\`;
    }).join("");
   
   stSel.onchange = e => {
    const opt = stSel.selectedOptions[0];
    if(opt && opt.dataset.course && $("#f_course")){
     $("#f_course").value = opt.dataset.course;
    }
   };
  }`;
html = html.replace(oldShowFormMem, newShowFormMem);

// In loadCur:
const oldLoadCurStart = `async function loadCur(){
 let d=null;
 if(_supa){
  const{data}=await _supa.from("reports").select("*").eq("id",rid()).maybeSingle();
  d=data||null;
 }else{
  const s=await localDb.doc("reports/"+rid()).get();
  d=s.exists?s.data():null;
 }
 cur=d||{photos:[]};
 cur.photos=cur.photos||[];
 
 $("#fs").value=d?d.school||"":"";
 if($("#fst"))$("#fst").value=d?(d.school_type||d.schoolType||""):"";
 $("#fp").value=d?d.address||"":"";
 $("#fpn").value=d?d.cname||"":"";
 $("#fpc").value=d?d.cphone||"":"";
 document.querySelectorAll(".act").forEach((a,i)=>a.value=d&&d.acts?d.acts[i]||"":"");
 let repVal=d&&d.report?d.report:"";
 if(!repVal&&d&&d.acts&&d.acts[5]&&typeof d.acts[5]==="string"&&d.acts[5].startsWith("[REPORT]: ")){
  repVal=d.acts[5].slice(10);
 }
 $("#fr").value=repVal;
 if(d&&d.date)$("#fd").value=d.date;`;

const newLoadCurStart = `async function loadCur(){
 let d=null;
 const targetId = rid();
 if(_supa){
  const{data}=await _supa.from("reports").select("*").eq("id",targetId).maybeSingle();
  d=data||null;
 }else{
  const s=await localDb.doc("reports/"+targetId).get();
  d=s.exists?s.data():null;
 }

 // If exact targetId not found, fallback to any existing report for this team & day
 if(!d && Array.isArray(reports)){
  d = reports.find(r => r.team_id === me && +r.day === +$("#fday").value) || null;
  if(d){ currentReportId = d.id; }
 }
 cur=d||{photos:[]};
 cur.photos=cur.photos||[];
 
 $("#fs").value=d?d.school||"":"";
 if($("#fst"))$("#fst").value=d?(d.school_type||d.schoolType||""):"";
 $("#fp").value=d?d.address||"":"";
 $("#fpn").value=d?d.cname||"":"";
 $("#fpc").value=d?d.cphone||"":"";

 // Anganwadi fields
 if($("#ang_name")) $("#ang_name").value=d?(d.anganwadi_name||(d.school_type==='anganvadi'?d.school:'')):"";
 if($("#ang_area")) $("#ang_area").value=d?d.anganwadi_area||"":"";
 if($("#ang_village")) $("#ang_village").value=d?(d.anganwadi_village||(d.school_type==='anganvadi'?d.address:'')):"";
 if($("#ang_worker")) $("#ang_worker").value=d?(d.anganwadi_worker||(d.school_type==='anganvadi'?d.cname:'')):"";
 if($("#ang_enrolled")) $("#ang_enrolled").value=(d&&d.anganwadi_enrolled!=null)?d.anganwadi_enrolled:"";
 if($("#ang_present")) $("#ang_present").value=(d&&d.anganwadi_present!=null)?d.anganwadi_present:"";
 if($("#ang_staff")) $("#ang_staff").value=(d&&d.anganwadi_staff!=null)?d.anganwadi_staff:"";

 // School attendance fields
 if($("#sch_enrolled")) $("#sch_enrolled").value=(d&&d.school_enrolled!=null)?d.school_enrolled:"";
 if($("#sch_present")) $("#sch_present").value=(d&&d.school_present!=null)?d.school_present:"";
 if($("#sch_teachers")) $("#sch_teachers").value=(d&&d.school_teachers_present!=null)?d.school_teachers_present:"";

 // Student, Course, Mentor
 if($("#f_student") && d && d.student_name) $("#f_student").value=d.student_name;
 if($("#f_course")) $("#f_course").value=d?d.student_course||"":"";
 if($("#f_mentor")) $("#f_mentor").value=d?d.mentor_name||"":"";

 document.querySelectorAll(".act").forEach((a,i)=>a.value=d&&d.acts?d.acts[i]||"":"");
 let repVal=d&&d.report?d.report:"";
 if(!repVal&&d&&d.acts&&d.acts[5]&&typeof d.acts[5]==="string"&&d.acts[5].startsWith("[REPORT]: ")){
  repVal=d.acts[5].slice(10);
 }
 $("#fr").value=repVal;
 if(d&&d.date){
  $("#fd").value=d.date;
 } else {
  const dayNum = +$("#fday").value || 1;
  $("#fd").value = '2026-10-' + String(25 + dayNum).padStart(2, '0');
 }`;

html = html.replace(oldLoadCurStart, newLoadCurStart);

// In saveRep:
const oldSaveRepBlock = `async function saveRep(){
 const t=T(me);
 const rawActs=[...document.querySelectorAll(".act")].map(a=>a.value.trim());
 const repText=$("#fr")?$("#fr").value.trim():"";
 const sType=$("#fst")?$("#fst").value:"";
 const d={
  group:MAIN,team_id:me,taluka:t.t,team:t.n,day:+$("#fday").value,date:$("#fd").value,
  school:$("#fs").value.trim(),school_type:sType,address:$("#fp").value.trim(),
  cname:$("#fpn").value.trim(),cphone:$("#fpc").value.trim(),
  acts:rawActs,
  report:repText,
  gps:pos?pos.latitude.toFixed(5)+","+pos.longitude.toFixed(5):(cur.gps||""),
  photos:cur.photos
 };`;

const newSaveRepBlock = `async function saveRep(){
 const t=T(me);
 const rawActs=[...document.querySelectorAll(".act")].map(a=>a.value.trim());
 const repText=$("#fr")?$("#fr").value.trim():"";
 const sType=$("#fst")?$("#fst").value:"";

 const angName=$("#ang_name")?$("#ang_name").value.trim():"";
 const angArea=$("#ang_area")?$("#ang_area").value.trim():"";
 const angVillage=$("#ang_village")?$("#ang_village").value.trim():"";
 const angWorker=$("#ang_worker")?$("#ang_worker").value.trim():"";
 const angEnrolled=$("#ang_enrolled")&&$("#ang_enrolled").value!==""?+$("#ang_enrolled").value:null;
 const angPresent=$("#ang_present")&&$("#ang_present").value!==""?+$("#ang_present").value:null;
 const angStaff=$("#ang_staff")&&$("#ang_staff").value!==""?+$("#ang_staff").value:null;

 const schEnrolled=$("#sch_enrolled")&&$("#sch_enrolled").value!==""?+$("#sch_enrolled").value:null;
 const schPresent=$("#sch_present")&&$("#sch_present").value!==""?+$("#sch_present").value:null;
 const schTeachers=$("#sch_teachers")&&$("#sch_teachers").value!==""?+$("#sch_teachers").value:null;

 const studentName=$("#f_student")?$("#f_student").value.trim():"";
 const studentCourse=$("#f_course")?$("#f_course").value.trim():"";
 const mentorName=$("#f_mentor")?$("#f_mentor").value.trim():"";

 const d={
  group:MAIN,team_id:me,taluka:t.t,team:t.n,day:+$("#fday").value,date:$("#fd").value,
  school:$("#fs").value.trim(),school_type:sType,address:$("#fp").value.trim(),
  cname:$("#fpn").value.trim(),cphone:$("#fpc").value.trim(),
  anganwadi_name:angName,anganwadi_area:angArea,anganwadi_village:angVillage,
  anganwadi_worker:angWorker,anganwadi_enrolled:angEnrolled,
  anganwadi_present:angPresent,anganwadi_staff:angStaff,
  school_enrolled:schEnrolled,school_present:schPresent,school_teachers_present:schTeachers,
  student_name:studentName,student_course:studentCourse,mentor_name:mentorName,
  acts:rawActs,
  report:repText,
  gps:pos?pos.latitude.toFixed(5)+","+pos.longitude.toFixed(5):(cur.gps||""),
  photos:cur.photos||[]
 };`;

html = html.replace(oldSaveRepBlock, newSaveRepBlock);

// ==========================================
// 5. UPDATE galleryUpload handler for smooth device uploads
// ==========================================
const oldUploadHandlerStart = '/* ---------- Gallery Upload Handler ---------- */';
const oldUploadHandlerEnd = '/* ---------- Designer PPT Export ---------- */';

const uStart = html.indexOf(oldUploadHandlerStart);
const uEnd = html.indexOf(oldUploadHandlerEnd);

if (uStart === -1 || uEnd === -1) {
  console.error("Could not find gallery upload handler!", uStart, uEnd);
  process.exit(1);
}

const newUploadHandlerCode = `/* ---------- Gallery Upload Handler (Device Uploads) ---------- */
if($("#galleryUpload"))$("#galleryUpload").onchange=async e=>{
 if(!me){toast("Please sign in or select a team first.");return}
 const files=[...e.target.files];
 e.target.value="";
 if(!files.length)return;
 
 if(!cur||typeof cur!=="object")cur={photos:[]};
 if(!Array.isArray(cur.photos))cur.photos=[];

 const remaining=10-cur.photos.length;
 if(remaining<=0){toast("10 photos already recorded for this day.");return}
 const toProcess=files.slice(0,remaining);
 if(files.length>remaining)toast("Only "+remaining+" more photo(s) allowed. Processing "+remaining+".");

 const stSpan=$("#galleryStatus");
 const uploadLbl=$("#lblGalleryUpload");
 if(uploadLbl)uploadLbl.style.pointerEvents="none";
 if(stSpan)stSpan.textContent="Processing "+toProcess.length+" photo(s)…";

 for(let idx=0; idx<toProcess.length; idx++){
  const f=toProcess[idx];
  if(stSpan)stSpan.textContent="Processing photo "+(idx+1)+"/"+toProcess.length+"…";
  try{
   const b=await loadImgBitmapOrElement(f);
   await new Promise((resolve,reject)=>{
    const bw=b.naturalWidth||b.width||1280;
    const bh=b.naturalHeight||b.height||720;
    const sc2=Math.min(1,1280/bw),w2=Math.round(bw*sc2),h2=Math.round(bh*sc2);
    const c2=document.createElement("canvas");
    c2.width=w2;c2.height=h2;
    const x2=c2.getContext("2d");
    x2.drawImage(b,0,0,w2,h2);
    const tm2=new Date().toLocaleString("en-IN"),g2=pos?pos.latitude.toFixed(5)+", "+pos.longitude.toFixed(5):"GPS n/a";
    const angN = $("#ang_name") ? $("#ang_name").value.trim() : "";
    const schN = $("#fs").value.trim();
    const scName = angN && schN ? (angN + " & " + schN) : (angN || schN || "Gujarat Vidyapith");
    const scAddr = ($("#ang_village") ? $("#ang_village").value.trim() : "") || $("#fp").value.trim() || (pos?pos.latitude.toFixed(5)+", "+pos.longitude.toFixed(5):"Field Visit");
    const LL=[MAIN+" · "+T(me).n+" · Day "+$("#fday").value,scName+" — "+scAddr,tm2+" · "+g2];
    const fs2=Math.max(14,Math.round(w2/42)),bh2=fs2*3.9;
    x2.fillStyle="rgba(0,0,0,0.65)";x2.fillRect(0,h2-bh2,w2,bh2);
    x2.fillStyle="#fff";x2.font="600 "+fs2+"px sans-serif";x2.textBaseline="top";
    
    const lw2=logoImg&&logoImg.complete&&logoImg.naturalWidth?Math.round(bh2*0.8*logoImg.naturalWidth/logoImg.naturalHeight):0;
    try{
     if(lw2>0){
      x2.fillStyle="#ffffff";x2.beginPath();x2.arc(10+bh2*0.4,h2-bh2+bh2*0.5,bh2*0.42,0,Math.PI*2);x2.fill();
      x2.drawImage(logoImg,10,h2-bh2+bh2*0.1,bh2*0.8,bh2*0.8);
      x2.fillStyle="#ffffff";
     }
    }catch(logErr){console.warn("Logo watermark draw notice:", logErr);}
    const textX3=lw2>0?bh2*0.8+24:14;
    LL.forEach((s,i)=>x2.fillText(s,textX3,h2-bh2+fs2*0.35+i*fs2*1.15,w2-textX3-12));
    
    c2.toBlob(async bl=>{
     try{
      if(!bl)throw new Error("Could not compress photo");
      const a=await window._upload(bl);
      cur.photos.push({id:a.id,url:a.url,time:tm2,gps:g2});
      const res=await saveRep();
      if(res){
       const savedId=res.id||rid();
       const rIdx=reports.findIndex(r=>r.id===savedId);
       if(rIdx>=0){reports[rIdx]={...reports[rIdx],...res};}
       else{reports.push({...res,id:savedId});}
      }
      drawMine();
      drawDash();
      toast("Photo uploaded ("+cur.photos.length+"/10) ✓");
      resolve();
     }catch(err){toast("Upload failed: "+(err.message||err));reject(err)}
    },"image/jpeg",0.82);
   });
  }catch(err){
   toast("Could not process photo: "+(err.message||err));
  }
 }
 if(uploadLbl)uploadLbl.style.pointerEvents="auto";
 if(stSpan)stSpan.textContent="Upload finished ("+cur.photos.length+"/10)";
 setTimeout(()=>{if(stSpan)stSpan.textContent="";},3500);
};

`;

html = html.slice(0, uStart) + newUploadHandlerCode + html.slice(uEnd);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully upgraded index.html with all features!");

