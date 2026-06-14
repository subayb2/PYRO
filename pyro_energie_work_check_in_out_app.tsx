import React, { useState, useEffect } from 'react';

// ==========================================
// 🔗 กำหนดลิงก์ GOOGLE APPS SCRIPT WEB APP URL ตรงนี้
// (หลังจาก Deploy สคริปต์ในสเปรดชีตแล้ว ให้นำลิงก์มาวางในเครื่องหมายอัญประกาศนี้)
// ==========================================
const GOOGLE_SCRIPT_URL = ""; 

// === ข้อมูลเริ่มต้นสำหรับจำลองประวัติ ===
const INITIAL_RECORDS = [
  {
    id: "REC-2026-001",
    checkInTime: "2026-06-14T09:15:00",
    branch: "PYRO ENERGIE (สระบุรี)",
    visitorType: "บุคคลภายนอก",
    agencyName: "เอสซีจี โลจิสติกส์",
    operatorName: "สมชาย รักดี",
    phone: "081-234-5678",
    carPlate: "3กข 4567 กรุงเทพฯ",
    operatorCount: 2,
    jobDetail: "ส่งน้ำมัน",
    jobDetailCustom: "",
    photoOperator: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=60",
    photoVehicle: "https://images.unsplash.com/photo-1516576880881-140175b02b6a?w=150&auto=format&fit=crop&q=60",
    status: "Active",
    checkOutTime: null,
    photoAfterWork: null,
    authorizer: "",
    guardName: ""
  },
  {
    id: "REC-2026-002",
    checkInTime: "2026-06-14T10:30:00",
    branch: "PYRO ENERGIE (สำนักงานใหญ่)",
    visitorType: "พนักงานบริษัท PYRO",
    agencyName: "",
    operatorName: "วิภา แสงงาม",
    phone: "095-888-7766",
    carPlate: "กข 1234 นนทบุรี",
    operatorCount: 1,
    jobDetail: "ขายยาง",
    jobDetailCustom: "",
    photoOperator: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=60",
    photoVehicle: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=150&auto=format&fit=crop&q=60",
    status: "Active",
    checkOutTime: null,
    photoAfterWork: null,
    authorizer: "",
    guardName: ""
  }
];

export default function App() {
  // --- States ---
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('pyro_records');
    return saved ? JSON.parse(saved) : INITIAL_RECORDS;
  });
  
  const [activeTab, setActiveTab] = useState('check-in'); // 'check-in' | 'active' | 'history'
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('ทั้งหมด');
  const [isSyncing, setIsSyncing] = useState(false);

  // Check-In Form State
  const [checkInTime, setCheckInTime] = useState('');
  const [branch, setBranch] = useState('PYRO ENERGIE (สำนักงานใหญ่)');
  const [visitorType, setVisitorType] = useState('บุคคลภายนอก');
  const [agencyName, setAgencyName] = useState('');
  const [operatorName, setOperatorName] = useState('');
  const [phone, setPhone] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [operatorCount, setOperatorCount] = useState(1);
  const [jobDetail, setJobDetail] = useState('ขายยาง');
  const [jobDetailCustom, setJobDetailCustom] = useState('');
  const [photoOperator, setPhotoOperator] = useState(null);
  const [photoVehicle, setPhotoVehicle] = useState(null);

  // Check-Out Modal State
  const [selectedRecordForOut, setSelectedRecordForOut] = useState(null);
  const [photoAfterWork, setPhotoAfterWork] = useState(null);
  const [authorizer, setAuthorizer] = useState('');
  const [guardName, setGuardName] = useState('');

  // Toast System
  const [toastMessage, setToastMessage] = useState(null);

  // Backup locally
  useEffect(() => {
    localStorage.setItem('pyro_records', JSON.stringify(records));
  }, [records]);

  // Set default current time
  useEffect(() => {
    refreshTime();
  }, [activeTab]);

  const refreshTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, 16);
    setCheckInTime(localISOTime);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Sync to Google Sheets and Google Drive Engine
  const syncToGoogleSheets = async (actionType, recordData) => {
    if (!GOOGLE_SCRIPT_URL) {
      console.warn("Google Apps Script URL has not been defined inside App.jsx yet. Operating locally.");
      return { success: false, reason: "no_url_configured" };
    }

    setIsSyncing(true);
    try {
      const payload = {
        action: actionType,
        ...recordData
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setIsSyncing(false);
      return { success: true };
    } catch (error) {
      console.error("Google Sheets Sync Failed: ", error);
      setIsSyncing(false);
      return { success: false, reason: error.message };
    }
  };

  // Generate Simulated Camera Photo
  const handleSimulatePhoto = (photoType, setPhotoFn) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 400, 300);
    if (photoType === 'operator') {
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#3b82f6');
    } else if (photoType === 'vehicle') {
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#f59e0b');
    } else {
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#10b981');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 300);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 400; i += 20) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 300); ctx.stroke();
    }
    for (let i = 0; i < 300; i += 20) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(400, i); ctx.stroke();
    }

    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.strokeRect(80, 50, 240, 200);
    
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(75, 45, 15, 4); ctx.fillRect(75, 45, 4, 15);
    ctx.fillRect(310, 45, 15, 4); ctx.fillRect(321, 45, 4, 15);
    ctx.fillRect(75, 251, 15, 4); ctx.fillRect(75, 240, 4, 15);
    ctx.fillRect(310, 251, 15, 4); ctx.fillRect(321, 240, 4, 15);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px "Courier New", sans-serif';
    ctx.fillText("📷 CAMERA SIMULATOR", 20, 30);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '12px "Courier New", sans-serif';
    ctx.fillText(`TIMESTAMP: ${new Date().toLocaleString('th-TH')}`, 20, 280);

    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.textAlign = 'center';
    if (photoType === 'operator') {
      ctx.fillStyle = '#93c5fd';
      ctx.fillText("[ รูปถ่ายผู้เข้าปฏิบัติงาน ]", 200, 130);
      ctx.font = '12px Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(operatorName || "ผู้ปฏิบัติงาน", 200, 160);
    } else if (photoType === 'vehicle') {
      ctx.fillStyle = '#fde047';
      ctx.fillText("[ รูปถ่ายรถยนต์ / ทะเบียน ]", 200, 130);
      ctx.font = '12px Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(carPlate || "รถบรรทุก / รถยนต์", 200, 160);
    } else {
      ctx.fillStyle = '#6ee7b7';
      ctx.fillText("[ รูปถ่ายหลังปฏิบัติงานเสร็จ ]", 200, 130);
      ctx.font = '12px Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText("ตรวจสอบหน้างานเรียบร้อย", 200, 160);
    }

    const dataUrl = canvas.toDataURL('image/png');
    setPhotoFn(dataUrl);
    showToast(`📸 ถ่ายภาพจำลองสำเร็จ`);
  };

  const handleFileUpload = (e, setPhotoFn) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoFn(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Check In Submit Action
  const handleCheckInSubmit = async (e) => {
    e.preventDefault();

    if (!branch || !visitorType || !operatorName || !phone || !carPlate || !operatorCount || !jobDetail) {
      showToast("❌ กรุณากรอกข้อมูลข้อ 1-11 ให้ครบถ้วน");
      return;
    }
    if (visitorType === 'บุคคลภายนอก' && !agencyName) {
      showToast("❌ กรุณาระบุชื่อหน่วยงานสำหรับบุคคลภายนอก");
      return;
    }

    const newRecord = {
      id: `REC-${Date.now().toString().slice(-6)}`,
      checkInTime: checkInTime || new Date().toISOString(),
      branch,
      visitorType,
      agencyName: visitorType === 'พนักงานบริษัท PYRO' ? '' : agencyName,
      operatorName,
      phone,
      carPlate,
      operatorCount: parseInt(operatorCount) || 1,
      jobDetail,
      jobDetailCustom: jobDetail === 'อื่นๆ' ? jobDetailCustom : '',
      photoOperator: photoOperator || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60",
      photoVehicle: photoVehicle || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=150&auto=format&fit=crop&q=60",
      status: "Active",
      checkOutTime: "",
      photoAfterWork: "",
      authorizer: "",
      guardName: ""
    };

    // Save locally
    setRecords([newRecord, ...records]);
    
    // Sync to Cloud (Sheets & Drive)
    if (GOOGLE_SCRIPT_URL) {
      showToast("🔄 กำลังอัปโหลดภาพเข้า Google Drive และบันทึกประวัติลง Google Sheets...");
      const syncResult = await syncToGoogleSheets('checkIn', newRecord);
      if (syncResult.success) {
        showToast("✅ บันทึกรูปภาพและข้อมูลสำเร็จ (ลิงก์รูปเก็บใน Google Drive แล้ว)");
      } else {
        showToast("⚠️ บันทึกในเครื่องแล้ว แต่เกิดข้อผิดพลาดในการส่งเข้าคลาวด์");
      }
    } else {
      showToast("✅ บันทึกข้อมูล Check-In ในเครื่องเรียบร้อยแล้ว! (ยังไม่ได้กำหนดตัวแปร Web App URL)");
    }
    
    // Reset Form
    setAgencyName('');
    setOperatorName('');
    setPhone('');
    setCarPlate('');
    setOperatorCount(1);
    setJobDetail('ขายยาง');
    setJobDetailCustom('');
    setPhotoOperator(null);
    setPhotoVehicle(null);
    
    setActiveTab('active');
  };

  // Check Out Action Trigger
  const handleCheckOutClick = (record) => {
    setSelectedRecordForOut(record);
    setPhotoAfterWork(null);
    setAuthorizer('');
    setGuardName('');
  };

  // Check Out Submit Action
  const handleCheckOutSubmit = async (e) => {
    e.preventDefault();

    if (!photoAfterWork || !authorizer || !guardName) {
      showToast("❌ กรุณากรอกข้อมูล ข้อ 12-14 ให้ครบถ้วนก่อนจึงจะ Check Out ได้");
      return;
    }

    const currentOutTime = new Date().toISOString();
    const recordToUpdate = {
      ...selectedRecordForOut,
      status: "CheckedOut",
      checkOutTime: currentOutTime,
      photoAfterWork,
      authorizer,
      guardName
    };

    // Update Local Storage and State
    const updatedRecords = records.map(rec => {
      if (rec.id === selectedRecordForOut.id) {
        return recordToUpdate;
      }
      return rec;
    });
    setRecords(updatedRecords);

    // Sync to Cloud (Sheets & Drive)
    if (GOOGLE_SCRIPT_URL) {
      showToast("🔄 กำลังอัปโหลดรูปตรวจงานเสร็จเข้า Google Drive และบันทึกเวลาออกลง Google Sheets...");
      const syncResult = await syncToGoogleSheets('checkOut', recordToUpdate);
      if (syncResult.success) {
        showToast(`🚪 ทำเรื่อง Check-Out รูปภาพและข้อมูลอัปเดตลงคลาวด์สำเร็จ!`);
      } else {
        showToast("⚠️ บันทึกออกสำเร็จในเครื่อง แต่ระบบส่งข้อมูลเข้าคลาวด์ไม่สำเร็จ");
      }
    } else {
      showToast(`🚪 ทำการ Check-Out ของคุณ ${selectedRecordForOut.operatorName} ในเครื่องเรียบร้อย!`);
    }

    setSelectedRecordForOut(null);
    setActiveTab('history');
  };

  const calculateDuration = (inTime, outTime) => {
    if (!inTime || !outTime) return '-';
    const diffMs = new Date(outTime) - new Date(inTime);
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins} นาที`;
    const diffHrs = Math.floor(diffMins / 60);
    const remainingMins = diffMins % 60;
    return `${diffHrs} ชม. ${remainingMins} นาที`;
  };

  const handleResetLocalData = () => {
    if (window.confirm("คุณต้องการล้างข้อมูลทดสอบในแผงควบคุมนี้ใช่หรือไม่? (ไม่มีผลกระทบต่อแถวใน Google Sheets / Drive)")) {
      setRecords(INITIAL_RECORDS);
      localStorage.removeItem('pyro_records');
      showToast("♻️ รีเซ็ตระบบกลับเป็นค่าทดสอบแล้ว");
    }
  };

  // Filters logic
  const filteredRecords = records.filter(rec => {
    const matchesSearch = 
      rec.operatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.carPlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rec.agencyName && rec.agencyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      rec.phone.includes(searchQuery);
    
    const matchesBranch = branchFilter === 'ทั้งหมด' || rec.branch === branchFilter;
    return matchesSearch && matchesBranch;
  });

  const activeRecords = filteredRecords.filter(rec => rec.status === 'Active');
  const historyRecords = filteredRecords.filter(rec => rec.status === 'CheckedOut');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-pulse max-w-sm bg-slate-900 text-white border-l-4 border-orange-500 rounded-lg shadow-xl p-4 flex items-center space-x-3">
          <div className="text-xs font-semibold">{toastMessage}</div>
        </div>
      )}

      {/* Header Banner - Clean Corporate Style */}
      <header className="bg-slate-900 text-white shadow-md border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-orange-500 to-amber-500 text-white p-3 rounded-xl shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wide">PYRO ENERGIE</h1>
              <p className="text-xs text-slate-400 font-medium">ระบบบันทึกความปลอดภัย เข้า-ออกโรงงาน (เชื่อมต่อ Google Sheet & Google Drive)</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {GOOGLE_SCRIPT_URL ? (
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>เชื่อมต่อ Google Sheets & Drive เรียบร้อยแล้ว</span>
              </span>
            ) : (
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold">
                ⚠️ โหมดบันทึกในเครื่อง (กรุณาแก้ไขลิงก์สคริปต์ในโค้ด)
              </span>
            )}
            
            <button 
              onClick={handleResetLocalData}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium transition-colors"
            >
              รีเซ็ตตารางจำลอง
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between py-3 space-y-3 sm:space-y-0">
          
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab('check-in')}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 ${activeTab === 'check-in' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <span>1. ลงทะเบียนเข้างาน (Check-In)</span>
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 ${activeTab === 'active' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>2. กำลังทำงาน ({records.filter(r => r.status === 'Active').length})</span>
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 ${activeTab === 'history' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9z" />
              </svg>
              <span>3. ประวัติในคลาวด์</span>
            </button>
          </div>

          {/* Table Filters */}
          {activeTab !== 'check-in' && (
            <div className="flex space-x-2 w-full sm:w-auto">
              <select 
                value={branchFilter} 
                onChange={(e) => setBranchFilter(e.target.value)}
                className="bg-slate-100 border-0 rounded-lg text-xs font-semibold px-3 py-1.5 text-slate-700"
              >
                <option value="ทั้งหมด">สาขา: ทั้งหมด</option>
                <option value="PYRO ENERGIE (สำนักงานใหญ่)">สำนักงานใหญ่</option>
                <option value="PYRO ENERGIE (สระบุรี)">สระบุรี</option>
                <option value="PYRO ENERGIE (นครราชสีมา)">นครราชสีมา</option>
                <option value="PYRO ENERGIE (กาญจนบุรี)">กาญจนบุรี</option>
                <option value="PYRO ENERGIE (ขอนแก่น)">ขอนแก่น</option>
                <option value="PYRO ENERGIE (ระยอง)">ระยอง</option>
              </select>
              <input 
                type="text" 
                placeholder="ค้นชื่อ ทะเบียนรถ เบอร์โทร..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-3 py-1.5 bg-slate-100 border-0 rounded-lg text-xs w-full sm:w-48 text-slate-700"
              />
            </div>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* TAB 1: REGISTER CHECK-IN FORM */}
        {activeTab === 'check-in' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 text-white">
              <h2 className="text-base font-bold flex items-center space-x-2">
                <span>📋 แบบฟอร์มลงข้อมูลสำหรับเจ้าหน้าที่ รปภ. (ข้อ 1 - 11)</span>
              </h2>
              <p className="text-xs text-orange-100 mt-1">กรอกข้อมูลให้ครบถ้วนก่อนส่งแบบฟอร์มเพื่ออัปโหลดภาพเข้า Google Drive และจดประวัติลง Google Sheets</p>
            </div>

            <form onSubmit={handleCheckInSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Date (Auto) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    ข้อ 1: วันที่และเวลาเข้าโรงงาน (อัตโนมัติ) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-2">
                    <input 
                      type="datetime-local" 
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-xs font-semibold text-slate-800"
                    />
                    <button 
                      type="button" 
                      onClick={refreshTime}
                      className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg px-3 py-2 text-slate-600 flex items-center justify-center"
                      title="อัปเดตเวลาปัจจุบัน"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H15" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 2. Branch dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    ข้อ 2: โรงงาน / สาขาของกลุ่มบริษัท PYRO <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-xs font-semibold text-slate-800"
                  >
                    <option value="PYRO ENERGIE (สำนักงานใหญ่)">PYRO ENERGIE (สำนักงานใหญ่)</option>
                    <option value="PYRO ENERGIE (สระบุรี)">PYRO ENERGIE (สระบุรี)</option>
                    <option value="PYRO ENERGIE (นครราชสีมา)">PYRO ENERGIE (นครราชสีมา)</option>
                    <option value="PYRO ENERGIE (กาญจนบุรี)">PYRO ENERGIE (กาญจนบุรี)</option>
                    <option value="PYRO ENERGIE (ขอนแก่น)">PYRO ENERGIE (ขอนแก่น)</option>
                    <option value="PYRO ENERGIE (ระยอง)">PYRO ENERGIE (ระยอง)</option>
                  </select>
                </div>

                {/* 3. Member type radio button */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    ข้อ 3: สังกัดผู้เข้าปฏิบัติงาน <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`border rounded-lg p-3 flex items-center justify-center cursor-pointer transition-all ${visitorType === 'พนักงานบริษัท PYRO' ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500/20 text-orange-700 font-semibold' : 'border-slate-300 hover:bg-slate-50 text-slate-600'}`}>
                      <input 
                        type="radio" 
                        name="visitorType" 
                        value="พนักงานบริษัท PYRO"
                        checked={visitorType === 'พนักงานบริษัท PYRO'}
                        onChange={(e) => {
                          setVisitorType(e.target.value);
                          setAgencyName(''); 
                        }}
                        className="sr-only"
                      />
                      <span className="text-xs">พนักงานบริษัท PYRO</span>
                    </label>

                    <label className={`border rounded-lg p-3 flex items-center justify-center cursor-pointer transition-all ${visitorType === 'บุคคลภายนอก' ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500/20 text-orange-700 font-semibold' : 'border-slate-300 hover:bg-slate-50 text-slate-600'}`}>
                      <input 
                        type="radio" 
                        name="visitorType" 
                        value="บุคคลภายนอก"
                        checked={visitorType === 'บุคคลภายนอก'}
                        onChange={(e) => setVisitorType(e.target.value)}
                        className="sr-only"
                      />
                      <span className="text-xs">บุคคลภายนอก</span>
                    </label>
                  </div>
                </div>

                {/* 4. Company Name (Hidden if PYRO Employee) */}
                <div>
                  {visitorType === 'บุคคลภายนอก' ? (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        ข้อ 4: ชื่อหน่วยงาน / สังกัดบริษัทภายนอก <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required={visitorType === 'บุคคลภายนอก'}
                        placeholder="ระบุบริษัทคู่ค้า เช่น ขนส่งพัสดุ, เอสซีจี..."
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 text-xs focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  ) : (
                    <div className="bg-slate-100 border border-dashed border-slate-300 rounded-lg p-4 flex flex-col justify-center h-full">
                      <span className="text-xs text-slate-400 text-center font-bold">เงื่อนไขข้อ 4: ซ่อนข้อมูลอัตโนมัติ</span>
                      <span className="text-[10px] text-slate-400 text-center">เนื่องจากเป็นพนักงานภายในบริษัท PYRO</span>
                    </div>
                  )}
                </div>

                {/* 5. Operator Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    ข้อ 5: ผู้ควบคุมงาน / ผู้เข้าปฏิบัติงาน <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="ระบุชื่อจริง-นามสกุลจริงผู้ควบคุมงาน"
                    value={operatorName}
                    onChange={(e) => setOperatorName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 text-xs"
                  />
                </div>

                {/* 6. Phone number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    ข้อ 6: เบอร์โทรศัพท์ผู้ปฏิบัติงาน <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    required
                    pattern="[0-9\-]*"
                    placeholder="ระบุเบอร์มือถือ เช่น 08x-xxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 text-xs"
                  />
                </div>

                {/* 7. License Vehicle Plate */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    ข้อ 7: ทะเบียนรถยนต์ / รถบรรทุก <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="เช่น 3กข 1234 กทม."
                    value={carPlate}
                    onChange={(e) => setCarPlate(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 text-xs"
                  />
                </div>

                {/* 8. Operator Count */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    ข้อ 8: จำนวนผู้เข้าปฏิบัติงานทั้งหมด (คน) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={operatorCount}
                    onChange={(e) => setOperatorCount(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 text-xs"
                  />
                </div>

                {/* 9. Job details */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    ข้อ 9: รายละเอียดการปฏิบัติงาน <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-3">
                    {['ขายยาง', 'รับน้ำมัน', 'ส่งน้ำมัน', 'ซื้อเศษเหล็ก', 'อื่นๆ'].map((opt) => (
                      <label key={opt} className={`border rounded-lg p-2.5 text-center cursor-pointer text-xs transition-all ${jobDetail === opt ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold' : 'border-slate-300 hover:bg-slate-50 text-slate-600'}`}>
                        <input 
                          type="radio" 
                          name="jobDetail" 
                          value={opt}
                          checked={jobDetail === opt}
                          onChange={(e) => setJobDetail(e.target.value)}
                          className="sr-only"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                  {jobDetail === 'อื่นๆ' && (
                    <input 
                      type="text"
                      required
                      placeholder="โปรดระบุรายละเอียดงานของท่านเพิ่มเติม..."
                      value={jobDetailCustom}
                      onChange={(e) => setJobDetailCustom(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 text-xs mt-2"
                    />
                  )}
                </div>

                {/* 10. Photo of the Operator */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    ข้อ 10: ภาพถ่ายผู้เข้าปฏิบัติงาน <span className="text-red-500">*</span>
                  </label>
                  <p className="text-[10px] text-slate-500 mb-3">ภาพจะบันทึกตรงเข้า Google Drive ในโฟลเดอร์โครงการของคุณ</p>
                  
                  {photoOperator ? (
                    <div className="relative rounded-lg overflow-hidden border border-slate-300 h-44 group bg-black">
                      <img src={photoOperator} alt="Operator Photo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button 
                          type="button" 
                          onClick={() => setPhotoOperator(null)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1.5 text-[10px] font-semibold"
                        >
                          ลบรูปและถ่ายใหม่
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-white flex flex-col items-center justify-center h-44">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      
                      <div className="flex flex-col space-y-2 w-full max-w-[180px]">
                        <button
                          type="button"
                          onClick={() => handleSimulatePhoto('operator', setPhotoOperator)}
                          className="bg-slate-850 hover:bg-slate-900 text-white text-[10px] py-1 px-3 rounded-lg font-bold shadow-xs transition-colors"
                        >
                          📸 จำลองการกดถ่ายภาพ
                        </button>
                        <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] py-1 px-3 rounded-lg font-bold text-center cursor-pointer border border-slate-300 transition-colors">
                          📂 เลือกไฟล์ภาพ
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileUpload(e, setPhotoOperator)}
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* 11. Photo of the Vehicle */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    ข้อ 11: ภาพถ่ายรถที่เข้าปฏิบัติงาน <span className="text-red-500">*</span>
                  </label>
                  <p className="text-[10px] text-slate-500 mb-3">ภาพรถจะถูกส่งไปแชร์ลิ้งค์ลงชีตและเก็บไว้บน Drive เช่นกัน</p>
                  
                  {photoVehicle ? (
                    <div className="relative rounded-lg overflow-hidden border border-slate-300 h-44 group bg-black">
                      <img src={photoVehicle} alt="Vehicle Photo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button 
                          type="button" 
                          onClick={() => setPhotoVehicle(null)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1.5 text-[10px] font-semibold"
                        >
                          ลบรูปและถ่ายใหม่
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-white flex flex-col items-center justify-center h-44">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      
                      <div className="flex flex-col space-y-2 w-full max-w-[180px]">
                        <button
                          type="button"
                          onClick={() => handleSimulatePhoto('vehicle', setPhotoVehicle)}
                          className="bg-slate-850 hover:bg-slate-900 text-white text-[10px] py-1 px-3 rounded-lg font-bold shadow-xs transition-colors"
                        >
                          📸 จำลองการกดถ่ายภาพ
                        </button>
                        <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] py-1 px-3 rounded-lg font-bold text-center cursor-pointer border border-slate-300 transition-colors">
                          📂 เลือกไฟล์ภาพ
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileUpload(e, setPhotoVehicle)}
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Form submit footer */}
              <div className="border-t border-slate-200 pt-6 flex justify-between items-center">
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  {GOOGLE_SCRIPT_URL ? (
                    <span className="text-emerald-600 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block mr-1"></span>
                      ระบบจะอัปโหลดภาพลง Google Drive และ Sheets
                    </span>
                  ) : (
                    <span className="text-amber-500">เก็บข้อมูลในเครื่องชั่วคราว</span>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-3 rounded-lg shadow-md transition-all active:scale-95 flex items-center space-x-2 text-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSyncing ? (
                    <span>🔄 กำลังบันทึกและส่งภาพลง Drive...</span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                      </svg>
                      <span>บันทึกประวัติการเข้างาน (Check-In)</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 2: ACTIVE VISITORS (IN PLANT) */}
        {activeTab === 'active' && (
          <div>
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h2 className="text-lg font-black text-slate-900">👥 รายชื่อผู้ที่กำลังปฏิบัติงานอยู่ในโรงงานขณะนี้</h2>
                <p className="text-xs text-slate-500 mt-1">
                  เมื่อทำงานเสร็จสิ้นแล้ว เจ้าหน้าที่ รปภ. จะต้องกดปุ่ม Check Out เพื่อลงข้อมูลปิดงานขั้นตอนที่ 12 - 14
                </p>
              </div>
            </div>

            {activeRecords.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <div className="bg-slate-100 p-4 rounded-full inline-block mb-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-slate-700">ไม่มีผู้กำลังปฏิบัติงานอยู่ในพื้นที่</h3>
                <p className="text-slate-500 text-xs mt-1">สามารถเริ่มต้นการจดบันทึกใหม่โดยไปที่แผง "ลงทะเบียนเข้างาน"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeRecords.map((rec) => (
                  <div 
                    key={rec.id} 
                    className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all relative"
                  >
                    <div className="bg-orange-50 text-orange-700 px-3 py-1 text-[10px] font-bold rounded-bl-xl absolute top-0 right-0">
                      ⏱️ เวลาเข้า: {new Date(rec.checkInTime).toLocaleTimeString('th-TH', {hour: '2-digit', minute:'2-digit'})} น.
                    </div>

                    <div className="p-5">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${rec.visitorType === 'พนักงานบริษัท PYRO' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {rec.visitorType}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">{rec.branch}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="col-span-2 space-y-2">
                          <div>
                            <span className="text-slate-400 text-[10px] block font-bold">ชื่อผู้ปฏิบัติงานหลัก</span>
                            <span className="text-xs font-extrabold text-slate-800">{rec.operatorName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] block font-bold">สังกัด / หน่วยงาน</span>
                            <span className="text-xs font-bold text-slate-700">{rec.agencyName || "พนักงานบริษัท PYRO"}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-slate-400 text-[10px] block font-bold">เบอร์โทรศัพท์</span>
                              <span className="text-xs font-semibold text-slate-600">{rec.phone}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 text-[10px] block font-bold">ทะเบียนยานพาหนะ</span>
                              <span className="text-xs font-bold text-slate-600 font-mono">{rec.carPlate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 items-center justify-center">
                          <div className="relative">
                            <img 
                              src={rec.photoOperator} 
                              alt="Operator" 
                              className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 shadow-xs"
                            />
                            <span className="absolute bottom-0 right-0 bg-slate-900 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold">
                              🧑
                            </span>
                          </div>
                          <div className="relative">
                            <img 
                              src={rec.photoVehicle} 
                              alt="Vehicle" 
                              className="w-14 h-9 rounded object-cover border border-slate-200 shadow-xs"
                            />
                            <span className="absolute -bottom-1 -right-1 bg-slate-900 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold">
                              🚛
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <span className="text-slate-400 text-[10px] block">รายละเอียดงาน</span>
                          <span className="text-xs font-extrabold text-slate-800">
                            💼 {rec.jobDetail === 'อื่นๆ' ? rec.jobDetailCustom : rec.jobDetail}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 text-[10px] block">จำนวนพนักงาน</span>
                          <span className="text-xs font-black text-slate-800">{rec.operatorCount} ท่าน</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border-t border-slate-100 px-5 py-3 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">
                        ID: {rec.id}
                      </span>
                      <button 
                        onClick={() => handleCheckOutClick(rec)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-1.5 px-4 rounded-lg flex items-center space-x-1 transition-colors cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Check Out (ออกโรงงาน)</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CLOUD HISTORY RECORDS */}
        {activeTab === 'history' && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-black text-slate-900">📄 ตารางประวัติบันทึกการเข้า - ออกโรงงานเสร็จสมบูรณ์</h2>
              <p className="text-xs text-slate-500 mt-1">แสดงรายชื่อทั้งหมดที่ผ่านกระบวนการส่งรูปภาพขึ้น Google Drive และเก็บสถิติตาราง Google Sheets เรียบร้อย</p>
            </div>

            {historyRecords.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <div className="bg-slate-100 p-4 rounded-full inline-block mb-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-slate-700">ไม่มีข้อมูลประวัติเสร็จสิ้น</h3>
                <p className="text-slate-500 text-xs mt-1">ประวัติจะเกิดขึ้นและซิงค์ลงสเปรดชีตทันทีหลังเสร็จสิ้นกระบวนการ Check-Out</p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider">
                        <th className="py-4 px-4 border-b border-slate-700">รหัสคิว / สาขา</th>
                        <th className="py-4 px-4 border-b border-slate-700">ผู้ปฏิบัติงาน / ต้นสังกัด</th>
                        <th className="py-4 px-4 border-b border-slate-700">ทะเบียนรถ / จุดประสงค์</th>
                        <th className="py-4 px-4 border-b border-slate-700">เวลา เข้า - ออก</th>
                        <th className="py-4 px-4 border-b border-slate-700">รวมเวลา</th>
                        <th className="py-4 px-4 border-b border-slate-700">รูปภาพหลังงานเสร็จ</th>
                        <th className="py-4 px-4 border-b border-slate-700">ผู้อนุญาต / รปภ. ผู้ตรวจ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {historyRecords.map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-mono text-xs font-bold text-orange-600 block">{rec.id}</span>
                            <span className="font-bold text-slate-800 text-[11px] block">{rec.branch}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-extrabold text-slate-900">
                              {rec.operatorName} <span className="text-[10px] text-slate-400 font-bold">({rec.operatorCount} คน)</span>
                            </div>
                            <span className="text-[11px] text-slate-500 block font-medium">
                              {rec.visitorType === 'พนักงานบริษัท PYRO' ? 'พนักงานบริษัท PYRO' : rec.agencyName}
                            </span>
                            <span className="text-[10px] text-slate-400 block">{rec.phone}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 text-[10px] font-mono font-bold rounded block w-max mb-1">
                              {rec.carPlate}
                            </span>
                            <span className="text-[11px] text-slate-600 font-semibold block">
                              💼 {rec.jobDetail === 'อื่นๆ' ? rec.jobDetailCustom : rec.jobDetail}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-semibold">
                            <div className="text-emerald-600">
                              ⬇️ {new Date(rec.checkInTime).toLocaleString('th-TH')}
                            </div>
                            <div className="text-red-600 mt-1">
                              ⬆️ {new Date(rec.checkOutTime).toLocaleString('th-TH')}
                            </div>
                          </td>
                          <td className="py-4 px-4 font-bold text-slate-900 text-center">
                            ⏱️ {calculateDuration(rec.checkInTime, rec.checkOutTime)}
                          </td>
                          <td className="py-4 px-4">
                            {rec.photoAfterWork ? (
                              <img 
                                src={rec.photoAfterWork} 
                                alt="After Work" 
                                className="w-12 h-12 rounded-lg object-cover border border-slate-300 cursor-zoom-in"
                                onClick={() => showToast(`ภาพตรวจสอบบันทึกไว้ในระบบประวัติแล้ว`)}
                              />
                            ) : (
                              <span className="text-slate-400 text-[10px]">ไม่มีรูปภาพ</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-slate-700">
                              🔑 ผู้อนุญาต: <span className="font-bold text-slate-900">{rec.authorizer}</span>
                            </div>
                            <div className="text-slate-500 mt-0.5">
                              👮 รปภ. บันทึก: <span className="font-bold text-slate-800">{rec.guardName}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* CHECK-OUT DRAWER / DIALOG MODAL (Saves steps 12 - 14) */}
      {selectedRecordForOut && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-red-500 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold">🚪 กรอกข้อมูลส่งออกนอกโรงงาน (Check-Out)</h3>
                <p className="text-[10px] text-red-100 mt-0.5">ผู้ปฏิบัติงาน: {selectedRecordForOut.operatorName} | คิว: {selectedRecordForOut.id}</p>
              </div>
              <button 
                onClick={() => setSelectedRecordForOut(null)}
                className="text-white hover:text-red-100 bg-red-600/50 hover:bg-red-600/80 rounded-full p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCheckOutSubmit} className="p-6 space-y-4 text-xs">
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800">
                <strong>ระเบียบความปลอดภัย:</strong> บังคับต้องลงข้อมูลภาพตรวจเสร็จงาน (ข้อ 12), ผู้เซ็นอนุญาต (ข้อ 13), และชื่อ รปภ. (ข้อ 14) ให้เรียบร้อยก่อนจึงจะทำการเปิดระบบให้กดออกโรงงานได้ โดยภาพจะเซฟเข้าโฟลเดอร์ Google Drive คลาวด์โดยตรง
              </div>

              {/* 12. Photo After Work */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  ข้อ 12: ภาพถ่ายหลังจากทำงานเสร็จเรียบร้อยแล้ว <span className="text-red-500">*</span>
                </label>
                <p className="text-[10px] text-slate-500 mb-2">เพื่อตรวจสอบความสะอาดหรือความเรียบร้อยของหน้างานปฏิบัติการ</p>
                
                {photoAfterWork ? (
                  <div className="relative rounded-lg overflow-hidden border border-slate-300 h-32 group bg-black">
                    <img src={photoAfterWork} alt="After Work Photo" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button 
                        type="button" 
                        onClick={() => setPhotoAfterWork(null)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1.5 text-[10px] font-semibold shadow-xs"
                      >
                        ลบรูปถ่ายใหม่
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center bg-slate-50 flex flex-col items-center justify-center h-32">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleSimulatePhoto('afterWork', setPhotoAfterWork)}
                        className="bg-slate-850 hover:bg-slate-900 text-white text-[9px] py-1 px-2.5 rounded font-bold shadow-xs transition-colors"
                      >
                        📸 จำลองกล้อง
                      </button>
                      <label className="bg-white hover:bg-slate-100 text-slate-700 text-[9px] py-1 px-2.5 rounded font-bold text-center cursor-pointer border border-slate-300 transition-colors">
                        📂 อัปโหลดภาพ
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileUpload(e, setPhotoAfterWork)}
                          className="hidden" 
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* 13. Authorizer Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  ข้อ 13: ผู้อนุญาตให้เข้าปฏิบัติงาน / ผู้เซ็นอนุญาต <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="เช่น ผจก.คลังสินค้า / หน. แผนกความปลอดภัย..."
                  value={authorizer}
                  onChange={(e) => setAuthorizer(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              {/* 14. Guard Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  ข้อ 14: ชื่อเจ้าหน้าที่ รปภ. ผู้ตรวจสอบความเรียบร้อยและลงบันทึกออก <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="ระบุชื่อเจ้าหน้าที่ รปภ. ประจำเวรผู้ทำเรื่อง"
                  value={guardName}
                  onChange={(e) => setGuardName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              {/* Form buttons */}
              <div className="border-t border-slate-100 pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedRecordForOut(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-4 py-2 rounded-lg text-xs text-center cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={!photoAfterWork || !authorizer || !guardName || isSyncing}
                  className={`flex-1 font-bold px-4 py-2 rounded-lg text-xs text-center flex items-center justify-center space-x-1 ${(!photoAfterWork || !authorizer || !guardName || isSyncing) ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white shadow-lg cursor-pointer'}`}
                >
                  {isSyncing ? (
                    <span>🔄 ซิงค์สเปรดชีตและอัปรูป...</span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>บันทึกอนุมัติออกโรงงาน (Check-Out)</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Corporate Footer */}
      <footer className="bg-slate-900 text-slate-500 py-6 border-t border-slate-800 text-center mt-12">
        <p className="text-[10px]">© 2026 PYRO ENERGIE Group. All rights reserved.</p>
        <p className="text-[9px] text-slate-600 mt-0.5">เชื่อมโยงจัดเก็บข้อมูลรูปถ่ายความปลอดภัยลงใน Google Drive โดยตรง</p>
      </footer>
    </div>
  );
}