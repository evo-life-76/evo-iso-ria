*{box-sizing:border-box}html,body{margin:0;font-family:Inter,ui-sans-serif,system-ui;color:#101828;background:#f7f8fa}button,input,select{font:inherit}button,.secondary{border:0;border-radius:10px;background:#111827;color:white;padding:12px 18px;font-weight:700;cursor:pointer;text-decoration:none}.secondary,.ghost{background:white;color:#111827;border:1px solid #d0d5dd}.login{min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at top,#fff,#eef1f5)}.login-card{width:min(380px,90vw);display:flex;flex-direction:column;gap:14px;background:white;padding:42px;border-radius:24px;box-shadow:0 20px 60px #10182820;align-items:center}.login-card input,.panel input,label input,label select{width:100%;padding:13px;border:1px solid #d0d5dd;border-radius:9px}.login-card button{width:100%}.error{color:#b42318}header{height:68px;background:white;border-bottom:1px solid #e4e7ec;display:flex;align-items:center;padding:0 24px;gap:24px}header nav{margin-left:auto;display:flex;gap:12px;align-items:center}header a{color:#111827;text-decoration:none;font-weight:700}.wrap{max-width:1180px;margin:0 auto;padding:48px 24px}.hero-actions{display:flex;gap:14px;margin:24px 0 48px}.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}.card,.panel{background:white;border:1px solid #e4e7ec;border-radius:16px;padding:20px;text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 16px #10182808}.modal{position:fixed;inset:0;background:#10182888;display:grid;place-items:center}.modal-box{width:min(520px,92vw);background:white;padding:28px;border-radius:18px;display:flex;flex-direction:column;gap:16px}.modal-box label{display:flex;flex-direction:column;gap:7px}.row{display:flex;justify-content:flex-end;gap:10px}.panel{margin:20px 0;max-width:700px}.user-row{display:grid;grid-template-columns:1fr 1.5fr .5fr;padding:12px 0;border-bottom:1px solid #eee}.editor-shell{height:calc(100vh - 68px);display:grid;grid-template-columns:250px 1fr}.editor-shell aside{padding:18px;background:#111827;color:white;display:flex;flex-direction:column;gap:12px}.editor-shell aside button{background:#344054}.editor-shell aside button.active{background:#dc2626}.editor-shell aside label{display:flex;flex-direction:column;gap:6px}.editor-shell aside input,.editor-shell aside select{padding:9px;border-radius:8px}.canvas{width:100%;height:100%;background:white}.node{cursor:pointer}@media print{header,.editor-shell aside{display:none}.editor-shell{display:block;height:auto}.canvas{width:420mm;height:297mm}.canvas rect{fill:white}}

/* Éditeur isométrique guidé V3 */
.iso-editor-shell{height:calc(100vh - 68px);display:grid;grid-template-columns:290px minmax(0,1fr) 265px;background:#eef1f5;overflow:hidden}.iso-sidebar,.iso-properties{background:#101828;color:#fff;padding:20px 18px;overflow:auto}.iso-properties{background:#fff;color:#101828;border-left:1px solid #dfe4ea}.iso-sidebar-title{display:flex;flex-direction:column;gap:5px;padding-bottom:16px;border-bottom:1px solid #344054}.iso-sidebar-title strong{font-size:20px}.iso-sidebar-title small{color:#98a2b3;line-height:1.4}.iso-kicker{font-size:11px;font-weight:800;letter-spacing:.14em;color:#f04438}.iso-tool-section{padding:16px 0;border-bottom:1px solid #344054}.iso-tool-section h3{font-size:13px;margin:0 0 10px;color:#d0d5dd;text-transform:uppercase;letter-spacing:.05em}.iso-direction-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.iso-direction-grid button,.iso-element-grid button,.iso-history-row button{background:#1d2939;border:1px solid #344054;color:#fff;border-radius:9px;padding:10px;display:flex;align-items:center;justify-content:center;gap:7px;font-size:13px}.iso-direction-grid button span{font-size:20px}.iso-direction-grid button.active{background:#d92d20;border-color:#f97066;box-shadow:0 0 0 2px #f0443830}.iso-fields{display:flex;flex-direction:column;gap:10px}.iso-fields h3{margin-bottom:0}.iso-fields label,.iso-properties label{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:700}.iso-fields input,.iso-fields select,.iso-properties input,.iso-properties select{width:100%;border:1px solid #475467;border-radius:8px;padding:10px;background:#fff;color:#101828}.iso-input-suffix{display:flex;align-items:center;background:#fff;border-radius:8px;overflow:hidden}.iso-input-suffix input{border:0!important;border-radius:0!important}.iso-input-suffix span{color:#667085;padding:0 10px;font-weight:700}.iso-primary-action{background:#d92d20!important;border:1px solid #f04438!important;border-radius:9px!important;padding:12px!important}.iso-element-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.iso-element-grid button{min-height:62px;flex-direction:column;font-size:18px}.iso-element-grid button span{font-size:11px}.iso-help{font-size:11px;color:#98a2b3;line-height:1.45;margin:10px 0 0}.iso-history-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}.iso-history-row .danger{grid-column:1/-1;color:#fda29b}.iso-history-row button:disabled{opacity:.35;cursor:not-allowed}.iso-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding-top:14px}.iso-stats span{background:#1d2939;border-radius:8px;padding:8px 4px;text-align:center;font-size:10px;color:#98a2b3}.iso-stats b{display:block;color:#fff;font-size:15px}.iso-workspace{min-width:0;position:relative;overflow:auto;padding:52px 18px 18px}.iso-canvas-toolbar{position:absolute;top:9px;left:18px;right:18px;height:35px;display:flex;align-items:center;gap:8px;background:#fff;border:1px solid #d0d5dd;border-radius:9px;padding:5px 8px;z-index:2;box-shadow:0 3px 10px #10182810;font-size:12px}.iso-canvas-toolbar button{padding:4px 9px;border-radius:6px;background:#f2f4f7;color:#344054}.iso-canvas-toolbar .ghost-mini{border:1px solid #d0d5dd;background:#fff}.iso-canvas-toolbar .danger-text{margin-left:auto;color:#b42318}.iso-canvas{display:block;min-width:1050px;width:100%;height:100%;min-height:680px;background:#fff;border:1px solid #cfd6df;box-shadow:0 10px 30px #10182814}.iso-node,.iso-segment{cursor:pointer}.iso-properties h3{margin:8px 0 20px}.iso-properties label{margin-bottom:13px}.iso-properties input,.iso-properties select{border-color:#d0d5dd}.iso-segment-properties{margin-top:20px;padding-top:18px;border-top:1px solid #e4e7ec}.iso-segment-properties h4{margin:0 0 14px}.iso-tip{margin-top:22px;background:#f9fafb;border:1px solid #eaecf0;border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:6px;font-size:12px;line-height:1.45;color:#475467}.iso-tip b{color:#101828}@media(max-width:1100px){.iso-editor-shell{grid-template-columns:270px 1fr}.iso-properties{display:none}}@media print{.iso-sidebar,.iso-properties,.iso-canvas-toolbar{display:none!important}.iso-editor-shell{display:block;height:auto}.iso-workspace{padding:0}.iso-canvas{border:0;box-shadow:none;width:420mm;height:297mm}}

/* V4 — unités + routage isométrique anti-chevauchement */
.iso-length-row { display:grid; grid-template-columns:minmax(0,1fr) 78px; gap:8px; }
.iso-length-row input,.iso-length-row select { width:100%; }
.iso-routing-notice { margin-top:8px; padding:9px 10px; border:1px solid #abefc6; background:#ecfdf3; color:#067647; border-radius:8px; font-size:12px; font-weight:700; line-height:1.35; }

/* V6 — parcours de l'eau + vraie projection 3D isométrique */
.iso-view-select{height:28px;min-width:210px;border:1px solid #d0d5dd;border-radius:6px;background:#fff;color:#344054;padding:2px 8px;font-size:12px}.iso-auto-view-note{color:#667085;font-size:11px;margin-left:6px}.iso-relative-grid button:first-child{grid-column:1/-1}.iso-relative-grid button:nth-child(4),.iso-relative-grid button:nth-child(5){background:#25364d}.iso-relative-grid button:nth-child(4).active,.iso-relative-grid button:nth-child(5).active{background:#175cd3;border-color:#53b1fd}@media(max-width:1250px){.iso-auto-view-note{display:none}.iso-view-select{min-width:150px}}

/* V8 TEST — commandes clarifiées + orientation fidèle au plan */
.iso-section-note{margin:-4px 0 12px;color:#98a2b3;font-size:11px;line-height:1.4}.iso-plan-pad{display:grid;grid-template-columns:58px 58px 58px;grid-template-rows:50px 50px 50px;gap:7px;justify-content:center}.iso-plan-pad button{background:#1d2939;border:1px solid #344054;color:#fff;border-radius:10px;font-size:27px;font-weight:800;padding:0;display:grid;place-items:center}.iso-plan-pad button.active{background:#d92d20;border-color:#f97066;box-shadow:0 0 0 2px #f0443830}.iso-plan-pad .pad-up{grid-column:2;grid-row:1}.iso-plan-pad .pad-left{grid-column:1;grid-row:2}.iso-plan-pad .pad-center{grid-column:2;grid-row:2;display:grid;place-items:center;border:1px dashed #475467;border-radius:10px;color:#98a2b3;font-size:10px;font-weight:900;letter-spacing:.12em}.iso-plan-pad .pad-right{grid-column:3;grid-row:2}.iso-plan-pad .pad-down{grid-column:2;grid-row:3}.iso-altitude-title{margin-top:18px!important}.iso-altitude-grid{display:grid;grid-template-columns:1fr;gap:8px}.iso-altitude-grid button{background:#25364d;border:1px solid #475467;color:#fff;border-radius:9px;padding:10px 12px;display:flex;align-items:center;justify-content:flex-start;gap:10px;font-size:12px;font-weight:750}.iso-altitude-grid button span{font-size:21px}.iso-altitude-grid button.active{background:#175cd3;border-color:#53b1fd;box-shadow:0 0 0 2px #1570ef30}.iso-canvas-toolbar button.active{background:#175cd3;color:#fff;border-color:#175cd3}.iso-view-select{min-width:280px}.iso-canvas text{paint-order:stroke;stroke:#fff;stroke-width:2px;stroke-linejoin:round}.iso-canvas g>rect+text{stroke-width:0}@media(max-width:1250px){.iso-view-select{min-width:210px}}

/* V9 — navigation du plan et piquages sur tuyauterie */
.iso-canvas{cursor:grab;touch-action:none;user-select:none;overscroll-behavior:contain}
.iso-canvas.is-panning{cursor:grabbing}
.iso-segment-group{cursor:crosshair}
.iso-navigation-hint{position:absolute;top:56px;left:30px;z-index:3;background:#101828e8;color:#fff;border:1px solid #344054;border-radius:7px;padding:6px 9px;font-size:11px;pointer-events:none;box-shadow:0 4px 12px #10182822}
.iso-tee-inline-action{width:100%;margin-top:10px;background:#175cd3;border:1px solid #53b1fd;color:#fff;border-radius:9px;padding:10px 8px;font-size:12px;font-weight:800}
.iso-tee-insert-card{margin-top:18px;padding:13px;border:1px solid #fda29b;background:#fef3f2;border-radius:10px;display:flex;flex-direction:column;gap:7px;color:#475467;font-size:12px}
.iso-tee-insert-card b{color:#b42318;font-size:13px}
.iso-tee-insert-card button{background:#d92d20;color:#fff;border:0;border-radius:8px;padding:10px;font-weight:800}
.iso-tee-insert-card small{color:#667085;line-height:1.35}

/* V11 — glissement des points, raccords éditables, textes propres et calcul hydraulique */
.iso-node{cursor:grab}.iso-node:active{cursor:grabbing}.iso-canvas.is-node-dragging{cursor:grabbing}.iso-canvas-toolbar .hydraulic-button{background:#0b4a6f;color:#fff;border:1px solid #0e7090;white-space:nowrap}.remove-fitting-button{background:#fff!important;color:#b42318!important;border:1px solid #fda29b!important;border-radius:8px!important;padding:10px 12px!important;font-weight:800!important}.segment-hydraulic-mini{margin-top:12px;padding:10px;border:1px solid #b2ddff;background:#eff8ff;border-radius:9px;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#175cd3}.segment-hydraulic-mini b{color:#1849a9}.iso-text-options{margin-top:20px;padding-top:18px;border-top:1px solid #e4e7ec}.iso-text-options h4{margin:0 0 12px}.iso-properties .check-row{display:flex;flex-direction:row;align-items:center;gap:8px;margin:8px 0;font-weight:650}.iso-properties .check-row input{width:16px;height:16px;margin:0}.iso-dialog-backdrop{position:fixed;inset:0;background:#10182888;z-index:50;display:grid;place-items:center;padding:24px}.iso-fitting-dialog{width:min(470px,95vw);background:#fff;border-radius:18px;padding:24px;box-shadow:0 24px 80px #10182840;display:flex;flex-direction:column;gap:14px}.iso-fitting-dialog h3{margin:0 0 4px}.iso-fitting-dialog label,.hydraulic-inputs label{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:750;color:#344054}.iso-fitting-dialog input,.iso-fitting-dialog select,.hydraulic-inputs input,.hydraulic-inputs select{width:100%;border:1px solid #d0d5dd;border-radius:8px;padding:10px;background:#fff;color:#101828}.iso-dialog-actions{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:6px}.iso-dialog-actions button{padding:10px 13px}.hydraulic-backdrop{place-items:stretch;padding:22px}.hydraulic-dialog{width:min(1500px,100%);height:min(900px,100%);margin:auto;background:#f8fafc;border-radius:20px;box-shadow:0 24px 90px #10182855;display:flex;flex-direction:column;overflow:hidden}.hydraulic-dialog-header{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;padding:22px 26px;background:#fff;border-bottom:1px solid #e4e7ec}.hydraulic-dialog-header h2{margin:4px 0 6px}.hydraulic-dialog-header p{margin:0;color:#667085;font-size:13px}.hydraulic-layout{display:grid;grid-template-columns:310px minmax(0,1fr);min-height:0;flex:1}.hydraulic-inputs{padding:20px;background:#fff;border-right:1px solid #e4e7ec;overflow:auto}.hydraulic-inputs h3,.hydraulic-results h3{margin:0 0 14px}.hydraulic-inputs label{margin-bottom:12px}.hydraulic-notice{margin-top:16px;padding:12px;border:1px solid #fec84b;background:#fffaeb;color:#93370d;border-radius:10px;font-size:11px;line-height:1.45}.hydraulic-results{padding:20px 22px;overflow:auto}.hydraulic-cards{display:grid;grid-template-columns:repeat(3,minmax(150px,1fr));gap:10px;margin-bottom:14px}.hydraulic-cards article{background:#fff;border:1px solid #e4e7ec;border-radius:12px;padding:13px;display:flex;flex-direction:column;gap:5px}.hydraulic-cards span{font-size:11px;color:#667085}.hydraulic-cards b{font-size:18px;color:#101828}.hydraulic-alerts{display:grid;gap:7px;margin:12px 0 20px}.hydraulic-alerts div{padding:10px 12px;background:#fff;border:1px solid #e4e7ec;border-left:4px solid #f79009;border-radius:8px;color:#475467;font-size:12px}.ria-pressure-list{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}.ria-pressure-list span{background:#fff;border:1px solid #b2ddff;border-radius:9px;padding:9px 11px;display:flex;gap:12px;font-size:12px;color:#175cd3}.ria-pressure-list b{color:#1849a9}.hydraulic-table-wrap{overflow:auto;border:1px solid #d0d5dd;border-radius:10px;background:#fff}.hydraulic-table-wrap table{width:100%;border-collapse:collapse;white-space:nowrap;font-size:11px}.hydraulic-table-wrap th{position:sticky;top:0;background:#f2f4f7;color:#344054;text-align:left;padding:9px;border-bottom:1px solid #d0d5dd}.hydraulic-table-wrap td{padding:9px;border-bottom:1px solid #eaecf0;color:#475467}.hydraulic-footer{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:14px;font-size:11px;color:#667085}@media(max-width:1100px){.hydraulic-layout{grid-template-columns:1fr}.hydraulic-inputs{border-right:0;border-bottom:1px solid #e4e7ec}.hydraulic-cards{grid-template-columns:repeat(2,minmax(140px,1fr))}}@media(max-width:760px){.hydraulic-backdrop{padding:0}.hydraulic-dialog{border-radius:0;height:100%}.hydraulic-dialog-header{padding:14px}.hydraulic-layout{display:block;overflow:auto}.hydraulic-inputs,.hydraulic-results{overflow:visible}.hydraulic-cards{grid-template-columns:1fr}.iso-dialog-actions{flex-direction:column}.iso-dialog-actions button{width:100%}}
.iso-canvas-toolbar{overflow-x:auto;overflow-y:hidden;white-space:nowrap;scrollbar-width:thin}.iso-canvas-toolbar>*{flex:0 0 auto}

/* V12 — interface épurée + configuration DN des raccords */
.iso-editor-shell{
  grid-template-columns:300px minmax(0,1fr) 310px;
  background:#e9eef5;
}
.iso-sidebar{
  padding:16px;
  background:linear-gradient(180deg,#0f172a 0%,#111c32 100%);
  border-right:1px solid #22304a;
  scrollbar-color:#475569 transparent;
}
.iso-sidebar-title{
  padding:4px 4px 18px;
  border-bottom:0;
  gap:6px;
}
.iso-sidebar-title strong{font-size:21px;letter-spacing:-.025em;color:#fff}
.iso-sidebar-title small{font-size:11.5px;color:#94a3b8;max-width:250px}
.iso-sidebar .iso-kicker{color:#fb7185}
.iso-sidebar .iso-tool-section{
  margin-top:10px;
  padding:14px;
  border:1px solid #293750;
  border-radius:14px;
  background:#18243a;
  box-shadow:inset 0 1px 0 #ffffff08,0 8px 20px #02061718;
}
.iso-sidebar .iso-tool-section h3{
  margin:0 0 11px;
  color:#e2e8f0;
  font-size:11px;
  letter-spacing:.09em;
}
.iso-section-note{color:#94a3b8;margin:-4px 0 10px}
.iso-plan-pad{grid-template-columns:50px 50px 50px;grid-template-rows:44px 44px 44px;gap:6px}
.iso-plan-pad button{
  border-radius:11px;
  background:#24324a;
  border-color:#34445f;
  font-size:24px;
  transition:transform .12s ease,background .12s ease,border-color .12s ease;
}
.iso-plan-pad button:hover,.iso-altitude-grid button:hover,.iso-element-grid button:hover{transform:translateY(-1px);border-color:#64748b}
.iso-plan-pad button.active{background:#e11d48;border-color:#fb7185;box-shadow:0 0 0 3px #fb718524}
.iso-plan-pad .pad-center{background:#111c32;border-color:#334155;color:#64748b}
.iso-altitude-title{margin-top:14px!important}
.iso-altitude-grid{grid-template-columns:1fr 1fr;gap:7px}
.iso-altitude-grid button{
  justify-content:center;
  min-height:44px;
  padding:8px;
  border-radius:10px;
  background:#24324a;
  border-color:#34445f;
  color:#e2e8f0;
}
.iso-altitude-grid button span{font-size:19px}
.iso-altitude-grid button.active{background:#2563eb;border-color:#60a5fa;box-shadow:0 0 0 3px #3b82f624}
.iso-fields{gap:9px}
.iso-fields label{color:#cbd5e1;font-size:11px}
.iso-fields input,.iso-fields select{
  height:38px;
  padding:8px 10px;
  border-color:#3b4a65;
  border-radius:9px;
  background:#f8fafc;
}
.iso-primary-action{
  margin-top:3px;
  min-height:42px;
  background:linear-gradient(135deg,#e11d48,#be123c)!important;
  border-color:#fb7185!important;
  box-shadow:0 8px 18px #be123c38;
}
.iso-element-grid{gap:7px}
.iso-element-grid button{
  min-height:55px;
  border-radius:11px;
  background:#24324a;
  border-color:#34445f;
  color:#f8fafc;
}
.iso-element-grid button span{color:#cbd5e1}
.iso-help{margin:10px 2px 0;color:#94a3b8}
.iso-history-row{grid-template-columns:1fr 1fr 1fr!important;gap:6px}
.iso-history-row button{
  min-width:0;
  padding:9px 5px;
  border-radius:9px;
  background:#24324a;
  border-color:#34445f;
  font-size:11px;
}
.iso-history-row .danger{grid-column:auto;color:#fda4af}
.iso-stats{padding:12px 2px 2px;gap:7px}
.iso-stats span{background:#18243a;border:1px solid #293750;border-radius:10px;padding:8px 3px}
.iso-stats b{font-size:16px}

.iso-workspace{padding:70px 14px 14px;overflow:hidden;background:#e9eef5}
.iso-canvas-toolbar{
  top:12px;
  left:14px;
  right:14px;
  height:48px;
  padding:6px;
  gap:8px;
  border:1px solid #d7dee8;
  border-radius:13px;
  background:#ffffffed;
  backdrop-filter:blur(10px);
  box-shadow:0 8px 24px #0f172a12;
  overflow-x:auto;
}
.iso-toolbar-group{display:flex;align-items:center;gap:5px;padding:3px;border-radius:9px;background:#f1f5f9;border:1px solid #e2e8f0}
.iso-toolbar-group>span{padding:0 4px;color:#64748b;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.06em}
.iso-canvas-toolbar button{height:32px;padding:5px 10px;border-radius:7px;background:transparent;color:#334155}
.iso-mode-switch button{min-width:76px}
.iso-mode-switch button.active{background:#0f172a;color:#fff;border-color:#0f172a;box-shadow:0 2px 6px #0f172a25}
.iso-orientation-control{padding-left:8px}
.iso-view-select{
  min-width:180px;
  height:32px;
  border:0;
  border-radius:7px;
  background:#fff;
  color:#334155;
  padding:0 9px;
  box-shadow:inset 0 0 0 1px #cbd5e1;
}
.iso-zoom-control b{min-width:48px;text-align:center;color:#334155;font-size:11px}
.iso-zoom-control button{min-width:32px;background:#fff;border:1px solid #d8e0ea}
.iso-toolbar-actions{display:flex;align-items:center;gap:6px;margin-left:auto}
.iso-canvas-toolbar .hydraulic-button{
  height:34px;
  padding:6px 13px;
  border-radius:8px;
  background:#0369a1;
  border-color:#0ea5e9;
  box-shadow:0 4px 10px #0369a125;
}
.iso-canvas-toolbar .danger-text{margin-left:0;color:#be123c;background:#fff;border:1px solid #fecdd3}
.iso-navigation-hint{
  top:72px;
  left:26px;
  padding:6px 10px;
  border:1px solid #dbe3ec;
  border-radius:999px;
  background:#fffffff2;
  color:#64748b;
  box-shadow:0 4px 12px #0f172a10;
}
.iso-canvas{
  min-width:900px;
  min-height:650px;
  border:1px solid #d5dde8;
  border-radius:16px;
  box-shadow:0 16px 40px #0f172a16;
  overflow:hidden;
}

.iso-properties{
  padding:18px 16px 28px;
  background:#f8fafc;
  border-left:1px solid #d8e0ea;
  scrollbar-color:#cbd5e1 transparent;
}
.iso-properties-heading{
  position:sticky;
  top:-18px;
  z-index:2;
  margin:-18px -16px 14px;
  padding:18px 16px 14px;
  background:#ffffffed;
  backdrop-filter:blur(8px);
  border-bottom:1px solid #e2e8f0;
}
.iso-properties-heading h3{margin:5px 0 8px;font-size:20px;letter-spacing:-.02em}
.iso-type-badge{display:inline-flex;align-items:center;padding:4px 8px;border-radius:999px;background:#eef2ff;color:#4338ca;font-size:10px;font-weight:800}
.iso-property-card,.iso-segment-properties,.iso-text-options,.iso-tee-insert-card,.iso-tip{
  margin-top:12px;
  padding:14px;
  border:1px solid #e2e8f0;
  border-radius:13px;
  background:#fff;
  box-shadow:0 4px 14px #0f172a08;
}
.iso-property-card label,.iso-segment-properties label{margin-bottom:11px;color:#475569}
.iso-property-card label:last-child,.iso-segment-properties label:last-child{margin-bottom:0}
.iso-properties input,.iso-properties select{height:39px;border-color:#d8e0ea;border-radius:9px;background:#fbfdff}
.iso-dn-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:12px}
.iso-dn-summary.two-cols{grid-template-columns:repeat(2,1fr)}
.iso-dn-summary span{padding:9px 5px;border:1px solid #dbeafe;border-radius:9px;background:#eff6ff;text-align:center}
.iso-dn-summary small{display:block;margin-bottom:2px;color:#64748b;font-size:9px;text-transform:uppercase;letter-spacing:.06em}
.iso-dn-summary b{color:#1d4ed8;font-size:14px}
.iso-configure-fitting{width:100%;height:40px;background:#0f172a;border-radius:9px;padding:8px 12px}
.iso-property-note{margin:8px 2px 12px;color:#64748b;font-size:10.5px;line-height:1.4}
.iso-tee-insert-card{border-color:#fed7aa;background:#fff7ed;color:#475569}
.iso-tee-insert-card b{color:#c2410c}
.iso-tee-insert-card button{background:#ea580c;box-shadow:0 5px 12px #ea580c25}
.iso-segment-properties{padding-top:14px;border-top:1px solid #e2e8f0}
.iso-segment-properties h4,.iso-text-options h4{font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:#334155}
.segment-hydraulic-mini{border-radius:10px}
.iso-text-options{display:grid;grid-template-columns:1fr 1fr;gap:2px 8px}
.iso-text-options h4{grid-column:1/-1}
.iso-properties .check-row{margin:4px 0;padding:7px 8px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:11px}
.iso-properties .check-row input{accent-color:#2563eb}
.iso-tip{box-shadow:none;background:#f1f5f9;color:#64748b}

.iso-dialog-backdrop{backdrop-filter:blur(4px);background:#0f172a99}
.iso-fitting-dialog{
  width:min(650px,96vw);
  padding:22px;
  border:1px solid #e2e8f0;
  border-radius:20px;
  box-shadow:0 28px 90px #02061755;
  gap:16px;
}
.iso-dialog-heading{display:flex;align-items:center;gap:12px;padding-bottom:14px;border-bottom:1px solid #e2e8f0}
.iso-dialog-heading h3{margin:3px 0 0;font-size:22px}
.iso-dialog-icon{width:46px;height:46px;display:grid;place-items:center;border-radius:13px;background:#0f172a;color:#fff;font-size:21px;font-weight:900;box-shadow:0 8px 18px #0f172a25}
.iso-fitting-general-grid{display:grid;grid-template-columns:180px minmax(0,1fr);gap:12px}
.iso-fitting-dn-panel{padding:14px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff}
.iso-fitting-dn-panel>div:first-child{display:flex;flex-direction:column;gap:3px;margin-bottom:11px}
.iso-fitting-dn-panel b{color:#1e3a8a;font-size:13px}
.iso-fitting-dn-panel small{color:#64748b;font-size:10.5px}
.iso-fitting-dn-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
.iso-fitting-dn-grid.three-cols{grid-template-columns:repeat(3,minmax(0,1fr))}
.iso-fitting-dn-grid label{margin:0}
.iso-dialog-actions{align-items:center;padding-top:4px}
.iso-dialog-spacer{flex:1}
.iso-save-fitting{background:#2563eb!important;border:1px solid #3b82f6!important}
.remove-fitting-button{padding:9px 11px!important}

@media(max-width:1280px){
  .iso-editor-shell{grid-template-columns:280px minmax(0,1fr) 290px}
  .iso-view-select{min-width:150px}
  .iso-toolbar-group>span{display:none}
}
@media(max-width:1080px){
  .iso-editor-shell{grid-template-columns:270px minmax(0,1fr)}
  .iso-properties{display:none}
  .iso-canvas{min-width:760px}
}
@media(max-width:760px){
  .iso-fitting-general-grid,.iso-fitting-dn-grid,.iso-fitting-dn-grid.three-cols{grid-template-columns:1fr}
  .iso-dialog-spacer{display:none}
}

/* V14 — tracé libre directement dans l'isométrie avec guide magnétique */
.iso-free-draw-switch button{min-width:94px}
.iso-free-draw-switch button.free-active{background:#2563eb;color:#fff;border-color:#2563eb;box-shadow:0 3px 10px #2563eb35}
.iso-navigation-hint.free-draw-hint{background:#eff6ff;color:#1d4ed8;border-color:#93c5fd;font-weight:800;box-shadow:0 5px 16px #2563eb18}
.iso-canvas.is-free-drawing{cursor:crosshair}
.iso-canvas.is-free-drawing .iso-node{cursor:pointer}
.iso-free-preview text{paint-order:normal;stroke:none}
@media(max-width:1280px){.iso-free-draw-switch button{min-width:82px;padding-left:8px;padding-right:8px}}

/* V15 — mode inverse et dimensionnement indicatif du surpresseur */
.hydraulic-mode-bar{
  display:flex;
  gap:8px;
  padding:10px 18px;
  background:#eef2f6;
  border-bottom:1px solid #d7dee8;
}
.hydraulic-mode-bar button{
  min-height:40px;
  padding:8px 14px;
  border:1px solid #cbd5e1;
  border-radius:10px;
  background:#fff;
  color:#475569;
  font-size:12px;
  font-weight:800;
  box-shadow:none;
}
.hydraulic-mode-bar button.active{
  border-color:#0f172a;
  background:#0f172a;
  color:#fff;
}
.hydraulic-mode-bar button.active.inverse{
  border-color:#0369a1;
  background:linear-gradient(135deg,#0369a1,#075985);
}
.pump-margin-panel{
  margin:17px 0 4px;
  padding:14px;
  border:1px solid #bae6fd;
  border-radius:13px;
  background:#f0f9ff;
}
.pump-margin-heading{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  margin-bottom:8px;
  color:#0c4a6e;
  font-size:12px;
  font-weight:800;
}
.pump-margin-heading b{
  min-width:54px;
  padding:5px 8px;
  border-radius:999px;
  background:#0369a1;
  color:#fff;
  text-align:center;
  font-size:13px;
}
.pump-margin-panel input[type="range"]{
  width:100%;
  padding:0;
  border:0;
  accent-color:#0284c7;
}
.pump-margin-scale{
  display:flex;
  justify-content:space-between;
  margin:3px 1px 12px;
  color:#64748b;
  font-size:9px;
  font-weight:700;
}
.pump-calculate-button{
  width:100%;
  min-height:42px;
  padding:9px 12px;
  border-radius:9px;
  background:linear-gradient(135deg,#0284c7,#0369a1);
  color:#fff;
  box-shadow:0 7px 18px #0369a128;
}
.pump-calculate-button:disabled{opacity:.42;cursor:not-allowed;box-shadow:none}
.pump-result-hero{
  margin-bottom:14px;
  padding:20px;
  border:1px solid #0ea5e9;
  border-radius:16px;
  background:linear-gradient(135deg,#082f49,#075985);
  color:#fff;
  box-shadow:0 14px 30px #07598525;
}
.pump-result-hero span{
  display:block;
  margin-bottom:7px;
  color:#bae6fd;
  font-size:10px;
  font-weight:900;
  letter-spacing:.12em;
}
.pump-result-hero strong{
  display:block;
  font-size:30px;
  line-height:1.15;
  letter-spacing:-.03em;
}
.pump-result-hero p{
  margin:8px 0 0;
  color:#e0f2fe;
  font-size:13px;
}
.pump-cards article:nth-child(2),
.pump-cards article:nth-child(3),
.pump-cards article:nth-child(5){border-color:#bae6fd;background:#f0f9ff}
.pump-breakdown{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:9px;
  margin:2px 0 18px;
}
.pump-breakdown>div{
  display:flex;
  flex-direction:column;
  gap:5px;
  padding:12px 13px;
  border:1px solid #e2e8f0;
  border-radius:11px;
  background:#fff;
}
.pump-breakdown span{color:#64748b;font-size:10px}
.pump-breakdown b{color:#0f172a;font-size:12px}
.pump-empty-state{
  min-height:360px;
  display:grid;
  place-content:center;
  justify-items:center;
  padding:34px;
  border:1px dashed #94a3b8;
  border-radius:16px;
  background:#fff;
  text-align:center;
}
.pump-empty-state>div{
  width:64px;
  height:64px;
  display:grid;
  place-items:center;
  border-radius:18px;
  background:#e0f2fe;
  color:#0369a1;
  font-size:32px;
  font-weight:900;
}
.pump-empty-state h3{margin:16px 0 7px}
.pump-empty-state p{max-width:560px;margin:0;color:#64748b;font-size:13px;line-height:1.55}
.pump-empty-state small{margin-top:13px;padding:8px 11px;border-radius:8px;background:#f1f5f9;color:#334155;font-weight:750}
@media(max-width:760px){
  .hydraulic-mode-bar{flex-direction:column;padding:9px}
  .hydraulic-mode-bar button{width:100%}
  .pump-result-hero strong{font-size:22px}
  .pump-breakdown{grid-template-columns:1fr}
}

/* V16 - export PDF multi-pages avec plan technique, rapport hydraulique et surpresseur */
.iso-canvas-toolbar .pdf-export-button{
  height:34px;
  padding:6px 13px;
  border:1px solid #f43f5e;
  border-radius:8px;
  background:linear-gradient(135deg,#e11d48,#be123c);
  color:#fff;
  box-shadow:0 4px 12px #be123c30;
  white-space:nowrap;
}
.pdf-export-backdrop{z-index:70}
.pdf-export-dialog{
  width:min(720px,96vw);
  max-height:94vh;
  overflow:auto;
  padding:24px;
  border:1px solid #e2e8f0;
  border-radius:22px;
  background:#fff;
  box-shadow:0 30px 100px #02061766;
}
.pdf-export-heading{display:flex;align-items:center;gap:14px;padding-bottom:17px;border-bottom:1px solid #e2e8f0}
.pdf-export-heading h2{margin:3px 0 5px;font-size:25px;letter-spacing:-.025em}
.pdf-export-heading p{margin:0;color:#64748b;font-size:12px}
.pdf-export-icon{
  width:54px;height:54px;display:grid;place-items:center;flex:0 0 auto;
  border-radius:15px;background:linear-gradient(135deg,#e11d48,#9f1239);color:#fff;
  font-size:15px;font-weight:950;box-shadow:0 10px 24px #be123c35
}
.pdf-export-page-one{
  display:grid;grid-template-columns:112px minmax(0,1fr) auto;align-items:center;gap:14px;
  margin-top:17px;padding:14px;border:1px solid #fecdd3;border-radius:14px;background:#fff1f2
}
.pdf-export-page-one img{display:block;width:105px;height:46px;object-fit:contain;background:#fff;border-radius:8px}
.pdf-export-page-one div{display:flex;flex-direction:column;gap:4px;min-width:0}
.pdf-export-page-one b{font-size:13px;color:#881337}
.pdf-export-page-one span{font-size:11px;line-height:1.45;color:#64748b}
.pdf-export-page-one strong{padding:5px 8px;border-radius:999px;background:#e11d48;color:#fff;font-size:9px;letter-spacing:.06em}
.pdf-export-options{display:grid;gap:10px;margin-top:14px}
.pdf-export-options label{
  display:grid;grid-template-columns:22px minmax(0,1fr) auto;align-items:center;gap:12px;
  margin:0;padding:14px;border:1px solid #dbe3ec;border-radius:13px;background:#fbfdff;cursor:pointer;
  transition:border-color .12s ease,background .12s ease,transform .12s ease
}
.pdf-export-options label:hover{transform:translateY(-1px);border-color:#94a3b8}
.pdf-export-options label.selected{border-color:#60a5fa;background:#eff6ff;box-shadow:0 0 0 3px #3b82f616}
.pdf-export-options input{width:18px;height:18px;margin:0;accent-color:#2563eb}
.pdf-export-options span{display:flex;flex-direction:column;gap:4px;min-width:0}
.pdf-export-options b{font-size:12.5px;color:#0f172a}
.pdf-export-options small{color:#64748b;font-size:10.5px;line-height:1.42}
.pdf-export-options em{padding:5px 8px;border-radius:999px;background:#f1f5f9;color:#475569;font-size:9px;font-style:normal;font-weight:800;white-space:nowrap}
.pdf-export-warning,.pdf-export-error{margin-top:12px;padding:11px 13px;border-radius:10px;font-size:11px;line-height:1.45}
.pdf-export-warning{border:1px solid #fed7aa;background:#fff7ed;color:#9a3412}
.pdf-export-error{border:1px solid #fda29b;background:#fff1f3;color:#b42318}
.pdf-export-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:18px;padding-top:16px;border-top:1px solid #e2e8f0}
.pdf-export-actions button{min-width:130px;padding:11px 16px}
.pdf-generate-button{background:linear-gradient(135deg,#e11d48,#be123c);box-shadow:0 8px 18px #be123c30}
.pdf-generate-button:disabled,.pdf-export-actions button:disabled{opacity:.48;cursor:not-allowed;box-shadow:none}
@media(max-width:700px){
  .pdf-export-dialog{padding:17px;border-radius:17px}
  .pdf-export-page-one{grid-template-columns:80px minmax(0,1fr)}
  .pdf-export-page-one img{width:76px;height:38px}
  .pdf-export-page-one strong{grid-column:2;justify-self:start}
  .pdf-export-options label{grid-template-columns:22px minmax(0,1fr)}
  .pdf-export-options em{grid-column:2;justify-self:start}
  .pdf-export-actions{flex-direction:column-reverse}
  .pdf-export-actions button{width:100%}
}
