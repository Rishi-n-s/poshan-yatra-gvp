const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// --- 1. Update Photo Gallery in drawDash ---
// Look for `<h2>Photo gallery (${P.length} photos)</h2>`
const oldGalleryStr = '<h2>Photo gallery (${P.length} photos)</h2>';
if (!html.includes(oldGalleryStr)) {
  console.error("Could not find oldGalleryStr in index.html!");
} else {
  // Replace the gallery section to deduplicate photos and add onerror
  const oldDashGal = `<h2>Photo gallery (\${P.length} photos)</h2>
  <div class="ph">\${P.slice(-48).reverse().map(p=>\`<img src="\${esc(p.url)}" loading="lazy" alt="\${esc(p.r.school)}" data-u="\${esc(p.url)}">\`).join("")||'<span class="mut">No photos yet. Use Team entry to snap photos.</span>'}</div>`;
  
  const newDashGal = `// Deduplicate gallery photos by URL so no duplicate photo ever appears
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

  html = html.replace(oldDashGal, newDashGal);
  console.log("Updated drawDash gallery rendering!");
}

// --- 2. Update Excel Export Functions ---
// We replace the functions excelWithPhotos and excelFormOnly with our new implementation that builds the official Word document sheet!
const oldExcelStart = '/* ---------- 1. Excel Export WITH Embedded Photos ---------- */';
const oldExcelEnd = '/* ---------- Designer PPT Export ---------- */';

const eStartIdx = html.indexOf(oldExcelStart);
const eEndIdx = html.indexOf(oldExcelEnd);

if (eStartIdx === -1 || eEndIdx === -1) {
  console.error("Could not find Excel functions block!", eStartIdx, eEndIdx);
  process.exit(1);
}

const newExcelCode = `/* ---------- Official Report Card Sheet Generator (Matches Word Document) ---------- */
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

html = html.slice(0, eStartIdx) + newExcelCode + html.slice(eEndIdx);
fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully updated Excel functions in index.html!");

