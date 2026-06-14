<!DOCTYPE html>
<html lang="th" class="h-full bg-[#0B132B]">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PYRO ENERGIE - Work Check IN</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Lucide Icons for beautiful modern look -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <!-- Custom styling for extra polish -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght=0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        body {
            font-family: 'Sarabun', sans-serif;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #0B132B;
        }
        ::-webkit-scrollbar-thumb {
            background: #1C2541;
            border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #82C341;
        }
    </style>
</head>
<body class="flex flex-col min-h-screen text-slate-100 bg-[#0B132B]">

    <!-- Top Navigation Header with Corporate Logo -->
    <header class="bg-[#080E21] border-b border-[#82C341]/20 sticky top-0 z-50 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-3">
                <!-- Verbatim Reference to PYRO LoGo.png with protective white card styling -->
                <div class="bg-white p-1.5 rounded-xl shadow-md flex items-center justify-center">
                    <img src="PYRO LoGo.png" alt="PYRO LoGo.png" class="h-12 w-auto object-contain" onerror="this.onerror=null; this.src='https://placehold.co/100x100/1a2c7b/82c341?text=PYRO';">
                </div>
                <div>
                    <h1 class="text-xl font-bold tracking-wider text-[#82C341] flex items-center gap-1.5">
                        PYRO ENERGIE
                    </h1>
                    <p class="text-xs text-slate-400">ระบบบันทึก เข้า-ออก โรงงาน (Work Check IN)</p>
                </div>
            </div>
            <!-- Quick Status Badge counters utilizing Logo Green and Blue -->
            <div class="flex gap-2">
                <div class="bg-[#121B33] border border-[#82C341]/30 px-3 py-1.5 rounded-lg text-center min-w-[100px]">
                    <span class="block text-[10px] text-[#82C341] uppercase font-bold tracking-wider">กำลังปฏิบัติงาน</span>
                    <span id="counter-active" class="text-lg font-bold text-[#82C341]">0</span>
                </div>
                <div class="bg-[#121B33] border border-[#1A2C7B]/60 px-3 py-1.5 rounded-lg text-center min-w-[100px]">
                    <span class="block text-[10px] text-blue-300 uppercase font-bold tracking-wider">ออกวันนี้</span>
                    <span id="counter-completed" class="text-lg font-bold text-blue-400">0</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Tab Selection Header -->
    <nav class="bg-[#0D1630] border-b border-[#121B33] sticky top-[73px] z-40">
        <div class="max-w-7xl mx-auto px-2 flex justify-start space-x-1 overflow-x-auto">
            <button onclick="switchTab('checkin')" id="tab-checkin" class="tab-btn px-4 py-3 border-b-2 border-[#82C341] text-[#82C341] font-semibold text-sm flex items-center gap-2 whitespace-nowrap transition-all">
                <i data-lucide="log-in" class="w-4 h-4"></i>
                ลงทะเบียน Check-In
            </button>
            <button onclick="switchTab('active-visitors')" id="tab-active-visitors" class="tab-btn px-4 py-3 border-b-2 border-transparent text-slate-400 font-semibold text-sm flex items-center gap-2 whitespace-nowrap transition-all relative">
                <i data-lucide="users" class="w-4 h-4"></i>
                กำลังปฏิบัติงาน
                <span id="badge-active-count" class="hidden absolute top-1 right-1 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">0</span>
            </button>
            <button onclick="switchTab('history')" id="tab-history" class="tab-btn px-4 py-3 border-b-2 border-transparent text-slate-400 font-semibold text-sm flex items-center gap-2 whitespace-nowrap transition-all">
                <i data-lucide="history" class="w-4 h-4"></i>
                ประวัติ เข้า-ออก
            </button>
            <button onclick="switchTab('integration')" id="tab-integration" class="tab-btn px-4 py-3 border-b-2 border-transparent text-slate-400 font-semibold text-sm flex items-center gap-2 whitespace-nowrap transition-all">
                <i data-lucide="database" class="w-4 h-4"></i>
                เชื่อมต่อ Google Sheets
            </button>
        </div>
    </nav>

    <!-- Main Container Content -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-4">

        <!-- TAB 1: CHECK IN FORM (Cleaned up from "ข้อ 1 - 11" labels) -->
        <section id="content-checkin" class="tab-content block">
            <div class="bg-[#121B33] rounded-2xl border border-[#1A2C7B]/30 shadow-xl overflow-hidden">
                <div class="bg-gradient-to-r from-[#82C341]/10 to-transparent p-5 border-b border-[#1A2C7B]/50">
                    <h2 class="text-lg font-bold text-[#82C341] flex items-center gap-2">
                        <i data-lucide="file-text"></i>
                        ฟอร์มลงข้อมูลสำหรับ เข้าปฏิบัติงาน (สำหรับ รปภ.)
                    </h2>
                    <p class="text-xs text-slate-400 mt-1">กรุณากรอกข้อมูลผู้ติดต่อและตรวจเช็กสภาพความปลอดภัยก่อนให้เริ่มงาน</p>
                </div>

                <form id="checkInForm" class="p-6 space-y-6">
                    <!-- Grid Container -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <!-- 1. วันที่เข้า (Auto-filled) -->
                        <div>
                            <label class="block text-sm font-semibold text-slate-300 mb-2">1. วันที่และเวลาที่เข้าโรงงาน (อัตโนมัติ)</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-[#82C341]">
                                    <i data-lucide="clock" class="w-5 h-5"></i>
                                </span>
                                <input type="text" id="checkInTime" name="checkInTime" readonly
                                    class="w-full pl-10 pr-4 py-3 bg-[#080E21] border border-[#1A2C7B] rounded-xl text-[#82C341] font-mono font-semibold focus:outline-none" />
                            </div>
                            <span class="text-[11px] text-slate-500 mt-1 block">วันและเวลาที่ทำรายการบันทึกปัจจุบัน</span>
                        </div>

                        <!-- 2. โรงงาน/สาขา -->
                        <div>
                            <label class="block text-sm font-semibold text-slate-300 mb-2">2. เลือกโรงงาน / สาขาที่เข้าติดต่อ <span class="text-rose-500">*</span></label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <i data-lucide="factory" class="w-5 h-5"></i>
                                </span>
                                <select id="factoryBranch" name="factoryBranch" required
                                    class="w-full pl-10 pr-4 py-3 bg-[#0D1630] border border-[#1A2C7B] rounded-xl focus:outline-none focus:border-[#82C341] focus:ring-1 focus:ring-[#82C341] text-slate-100 appearance-none">
                                    <option value="" disabled selected>-- กรุณาเลือกสาขา --</option>
                                    <option value="PYRO ENERGIE (สำนักงานใหญ่)">PYRO ENERGIE (สำนักงานใหญ่)</option>
                                    <option value="PYRO ENERGIE (สระบุรี)">PYRO ENERGIE (สระบุรี)</option>
                                    <option value="PYRO ENERGIE (นครราชสีมา)">PYRO ENERGIE (นครราชสีมา)</option>
                                    <option value="PYRO ENERGIE (กาญจนบุรี)">PYRO ENERGIE (กาญจนบุรี)</option>
                                    <option value="PYRO ENERGIE (ขอนแก่น)">PYRO ENERGIE (ขอนแก่น)</option>
                                    <option value="PYRO ENERGIE (ระยอง)">PYRO ENERGIE (ระยอง)</option>
                                </select>
                            </div>
                        </div>

                        <!-- 3. หน่วยงาน -->
                        <div>
                            <label class="block text-sm font-semibold text-slate-300 mb-2">3. สังกัดหน่วยงาน <span class="text-rose-500">*</span></label>
                            <div class="grid grid-cols-2 gap-4">
                                <label class="flex items-center gap-3 p-3.5 bg-[#0D1630] border border-[#1A2C7B] rounded-xl cursor-pointer hover:bg-[#121B33] transition-all select-none">
                                    <input type="radio" name="orgType" value="employee" checked onchange="toggleOrganizationField()"
                                        class="w-5 h-5 text-[#82C341] bg-[#080E21] border-[#1A2C7B] focus:ring-[#82C341] focus:ring-offset-[#0B132B]">
                                    <span class="text-sm font-medium text-slate-200">พนักงานบริษัท PYRO</span>
                                </label>
                                <label class="flex items-center gap-3 p-3.5 bg-[#0D1630] border border-[#1A2C7B] rounded-xl cursor-pointer hover:bg-[#121B33] transition-all select-none">
                                    <input type="radio" name="orgType" value="external" onchange="toggleOrganizationField()"
                                        class="w-5 h-5 text-[#82C341] bg-[#080E21] border-[#1A2C7B] focus:ring-[#82C341] focus:ring-offset-[#0B132B]">
                                    <span class="text-sm font-medium text-slate-200">บุคคลภายนอก</span>
                                </label>
                            </div>
                        </div>

                        <!-- 4. ชื่อหน่วยงาน (Conditional Render) -->
                        <div id="orgNameContainer" class="hidden">
                            <label class="block text-sm font-semibold text-slate-300 mb-2">4. ชื่อหน่วยงาน / บริษัทภายนอกต้นสังกัด <span class="text-rose-500">*</span></label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <i data-lucide="building-2" class="w-5 h-5"></i>
                                </span>
                                <input type="text" id="organizationName" name="organizationName" placeholder="ระบุบริษัท หรือหน่วยงานต้นสังกัด"
                                    class="w-full pl-10 pr-4 py-3 bg-[#0D1630] border border-[#1A2C7B] rounded-xl focus:outline-none focus:border-[#82C341] focus:ring-1 focus:ring-[#82C341] text-slate-100" />
                            </div>
                        </div>

                        <!-- 5. ผู้ควบคุมงาน / ผู้เข้าปฏิบัติงาน -->
                        <div>
                            <label class="block text-sm font-semibold text-slate-300 mb-2">5. ชื่อผู้ควบคุมงาน / ผู้เข้าปฏิบัติงาน <span class="text-rose-500">*</span></label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <i data-lucide="user" class="w-5 h-5"></i>
                                </span>
                                <input type="text" id="workerName" name="workerName" required placeholder="นายสมชาย มีดี"
                                    class="w-full pl-10 pr-4 py-3 bg-[#0D1630] border border-[#1A2C7B] rounded-xl focus:outline-none focus:border-[#82C341] focus:ring-1 focus:ring-[#82C341] text-slate-100" />
                            </div>
                        </div>

                        <!-- 6. เบอร์โทรศัพท์ -->
                        <div>
                            <label class="block text-sm font-semibold text-slate-300 mb-2">6. เบอร์โทรศัพท์ติดต่อ <span class="text-rose-500">*</span></label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <i data-lucide="phone" class="w-5 h-5"></i>
                                </span>
                                <input type="tel" id="phoneNumber" name="phoneNumber" required placeholder="08X-XXX-XXXX" pattern="[0-9\-]+"
                                    class="w-full pl-10 pr-4 py-3 bg-[#0D1630] border border-[#1A2C7B] rounded-xl focus:outline-none focus:border-[#82C341] focus:ring-1 focus:ring-[#82C341] text-slate-100" />
                            </div>
                        </div>

                        <!-- 7. ทะเบียนรถ -->
                        <div>
                            <label class="block text-sm font-semibold text-slate-300 mb-2">7. ทะเบียนรถที่เข้าโรงงาน <span class="text-rose-500">*</span></label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <i data-lucide="truck" class="w-5 h-5"></i>
                                </span>
                                <input type="text" id="carLicense" name="carLicense" required placeholder="กก 1234 กรุงเทพฯ"
                                    class="w-full pl-10 pr-4 py-3 bg-[#0D1630] border border-[#1A2C7B] rounded-xl focus:outline-none focus:border-[#82C341] focus:ring-1 focus:ring-[#82C341] text-slate-100" />
                            </div>
                        </div>

                        <!-- 8. จำนวนผู้ปฏิบัติงาน -->
                        <div>
                            <label class="block text-sm font-semibold text-slate-300 mb-2">8. จำนวนผู้เข้าปฏิบัติงานทั้งหมด (รวมตนเอง) <span class="text-rose-500">*</span></label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <i data-lucide="users" class="w-5 h-5"></i>
                                </span>
                                <input type="number" id="workerCount" name="workerCount" required min="1" placeholder="1"
                                    class="w-full pl-10 pr-4 py-3 bg-[#0D1630] border border-[#1A2C7B] rounded-xl focus:outline-none focus:border-[#82C341] focus:ring-1 focus:ring-[#82C341] text-slate-100" />
                            </div>
                        </div>

                        <!-- 9. รายละเอียดการปฏิบัติงาน -->
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-slate-300 mb-2">9. รายละเอียดการปฏิบัติงาน <span class="text-rose-500">*</span></label>
                            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                <label class="job-option flex flex-col items-center justify-center p-3 bg-[#0D1630] border border-[#1A2C7B] rounded-xl cursor-pointer hover:bg-[#121B33] hover:border-[#82C341]/50 transition-all text-center select-none">
                                    <input type="radio" name="jobDetails" value="ขายยาง" checked class="sr-only">
                                    <i data-lucide="disc" class="w-6 h-6 text-[#82C341] mb-1.5"></i>
                                    <span class="text-xs font-semibold">ขายยาง</span>
                                </label>
                                <label class="job-option flex flex-col items-center justify-center p-3 bg-[#0D1630] border border-[#1A2C7B] rounded-xl cursor-pointer hover:bg-[#121B33] hover:border-[#82C341]/50 transition-all text-center select-none">
                                    <input type="radio" name="jobDetails" value="รับน้ำมัน" class="sr-only">
                                    <i data-lucide="droplet" class="w-6 h-6 text-sky-400 mb-1.5"></i>
                                    <span class="text-xs font-semibold">รับน้ำมัน</span>
                                </label>
                                <label class="job-option flex flex-col items-center justify-center p-3 bg-[#0D1630] border border-[#1A2C7B] rounded-xl cursor-pointer hover:bg-[#121B33] hover:border-[#82C341]/50 transition-all text-center select-none">
                                    <input type="radio" name="jobDetails" value="ส่งน้ำมัน" class="sr-only">
                                    <i data-lucide="navigation-2" class="w-6 h-6 text-emerald-400 mb-1.5"></i>
                                    <span class="text-xs font-semibold">ส่งน้ำมัน</span>
                                </label>
                                <label class="job-option flex flex-col items-center justify-center p-3 bg-[#0D1630] border border-[#1A2C7B] rounded-xl cursor-pointer hover:bg-[#121B33] hover:border-[#82C341]/50 transition-all text-center select-none">
                                    <input type="radio" name="jobDetails" value="ซื้อเศษเหล็ก" class="sr-only">
                                    <i data-lucide="hammer" class="w-6 h-6 text-violet-400 mb-1.5"></i>
                                    <span class="text-xs font-semibold">ซื้อเศษเหล็ก</span>
                                </label>
                                <label class="job-option flex flex-col items-center justify-center p-3 bg-[#0D1630] border border-[#1A2C7B] rounded-xl cursor-pointer hover:bg-[#121B33] hover:border-[#82C341]/50 transition-all text-center select-none">
                                    <input type="radio" name="jobDetails" value="อื่นๆ" onchange="toggleOtherJobInput()" class="sr-only">
                                    <i data-lucide="more-horizontal" class="w-6 h-6 text-slate-400 mb-1.5"></i>
                                    <span class="text-xs font-semibold">อื่นๆ</span>
                                </label>
                            </div>
                            <!-- Extra input for "Other" job type -->
                            <div id="otherJobContainer" class="mt-3 hidden">
                                <input type="text" id="otherJobText" placeholder="โปรดระบุรายละเอียดงานเพิ่มเติม"
                                    class="w-full px-4 py-2.5 bg-[#0D1630] border border-[#1A2C7B] rounded-xl focus:outline-none focus:border-[#82C341] text-slate-100 text-sm">
                            </div>
                        </div>

                        <!-- 10. ภาพถ่ายผู้เข้าปฏิบัติงาน -->
                        <div>
                            <label class="block text-sm font-semibold text-slate-300 mb-2">10. ภาพถ่ายผู้เข้าปฏิบัติงาน (ถ่ายจากล้องหรืออัปโหลด) <span class="text-rose-500">*</span></label>
                            <div class="flex flex-col items-center justify-center p-4 bg-[#0D1630] border-2 border-dashed border-[#1A2C7B] rounded-2xl hover:border-[#82C341]/50 transition-all relative">
                                <input type="file" id="imgWorker" accept="image/*" capture="environment" required onchange="previewImage(this, 'preview-worker')"
                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                <div id="container-preview-worker" class="text-center">
                                    <div class="bg-[#121B33] p-3 rounded-full inline-block text-[#82C341] mb-2">
                                        <i data-lucide="camera" class="w-8 h-8"></i>
                                    </div>
                                    <p class="text-sm font-semibold">กดเพื่อเปิดกล้องถ่ายภาพผู้ปฏิบัติงาน</p>
                                    <p class="text-xs text-slate-500 mt-1">ไฟล์รูปภาพทั่วไป .PNG, .JPG</p>
                                </div>
                                <img id="preview-worker" class="hidden max-h-[180px] w-auto rounded-lg object-contain shadow-lg border border-[#1A2C7B] mt-1 z-20" />
                                <button type="button" id="btn-clear-worker" onclick="clearPhoto('imgWorker', 'preview-worker')" class="hidden absolute top-2 right-2 bg-rose-600 hover:bg-rose-700 text-white p-1.5 rounded-full z-30 transition-all">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>

                        <!-- 11. ภาพถ่ายรถที่เข้าปฏิบัติงาน -->
                        <div>
                            <label class="block text-sm font-semibold text-slate-300 mb-2">11. ภาพถ่ายรถที่เข้าปฏิบัติงาน <span class="text-rose-500">*</span></label>
                            <div class="flex flex-col items-center justify-center p-4 bg-[#0D1630] border-2 border-dashed border-[#1A2C7B] rounded-2xl hover:border-[#82C341]/50 transition-all relative">
                                <input type="file" id="imgCar" accept="image/*" capture="environment" required onchange="previewImage(this, 'preview-car')"
                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                <div id="container-preview-car" class="text-center">
                                    <div class="bg-[#121B33] p-3 rounded-full inline-block text-[#82C341] mb-2">
                                        <i data-lucide="camera" class="w-8 h-8"></i>
                                    </div>
                                    <p class="text-sm font-semibold">กดเพื่อเปิดกล้องถ่ายภาพรถ</p>
                                    <p class="text-xs text-slate-500 mt-1">ให้มองเห็นป้ายทะเบียนชัดเจน</p>
                                </div>
                                <img id="preview-car" class="hidden max-h-[180px] w-auto rounded-lg object-contain shadow-lg border border-[#1A2C7B] mt-1 z-20" />
                                <button type="button" id="btn-clear-car" onclick="clearPhoto('imgCar', 'preview-car')" class="hidden absolute top-2 right-2 bg-rose-600 hover:bg-rose-700 text-white p-1.5 rounded-full z-30 transition-all">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>

                    </div>

                    <!-- Action Button Check-In utilizing Brand colors -->
                    <div class="pt-4 border-t border-[#1A2C7B] flex justify-end">
                        <button type="submit" class="w-full sm:w-auto bg-[#82C341] hover:bg-[#6FA835] text-[#0B132B] font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#82C341]/15 transition-all text-base">
                            <i data-lucide="log-in" class="w-5 h-5"></i>
                            ยืนยันการบันทึก Check-In เข้าโรงงาน
                        </button>
                    </div>
                </form>
            </div>
        </section>


        <!-- TAB 2: ACTIVE VISITORS (CHECK OUT INTERFACE) -->
        <section id="content-active-visitors" class="tab-content hidden">
            <div class="bg-[#121B33] rounded-2xl border border-[#1A2C7B]/30 shadow-xl overflow-hidden">
                <div class="bg-gradient-to-r from-[#82C341]/10 to-transparent p-5 border-b border-[#1A2C7B]/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 class="text-lg font-bold text-[#82C341] flex items-center gap-2">
                            <i data-lucide="clock-alert"></i>
                            รายการผู้ที่กำลังอยู่ในพื้นที่ปฏิบัติงานขณะนี้
                        </h2>
                        <p class="text-xs text-slate-400 mt-1">แสดงรายชื่อที่เข้ามาและยังไม่ได้ทำการ Check-Out ออกจากโรงงาน</p>
                    </div>
                    <!-- Real-time search inside table -->
                    <div class="relative max-w-xs w-full">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <i data-lucide="search" class="w-4 h-4"></i>
                        </span>
                        <input type="text" id="activeSearch" oninput="filterActiveTable()" placeholder="ค้นหาชื่อ ทะเบียน หรือสาขา..." 
                            class="w-full pl-9 pr-4 py-2 bg-[#0D1630] border border-[#1A2C7B] rounded-xl focus:outline-none focus:border-[#82C341] text-sm">
                    </div>
                </div>

                <div class="p-6">
                    <div class="overflow-x-auto rounded-xl border border-[#1A2C7B]">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-[#080E21] border-b border-[#1A2C7B] text-xs font-bold uppercase tracking-wider text-slate-300">
                                    <th class="p-4">วัน-เวลาเข้า</th>
                                    <th class="p-4">โรงงาน / สาขา</th>
                                    <th class="p-4">ผู้เข้าปฏิบัติงาน</th>
                                    <th class="p-4">สังกัดหน่วยงาน</th>
                                    <th class="p-4">รายละเอียดงาน</th>
                                    <th class="p-4 text-center">แอ็กชัน</th>
                                </tr>
                            </thead>
                            <tbody id="active-list-body" class="divide-y divide-[#1A2C7B]/60 text-sm">
                                <!-- JavaScript will inject rows here dynamically -->
                                <tr>
                                    <td colspan="6" class="p-8 text-center text-slate-500">
                                        <i data-lucide="info" class="w-10 h-10 mx-auto text-slate-600 mb-2"></i>
                                        ไม่พบข้อมูลผู้ปฏิบัติงานค้างอยู่ในขณะนี้
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>


        <!-- TAB 3: HISTORY LOGS -->
        <section id="content-history" class="tab-content hidden">
            <div class="bg-[#121B33] rounded-2xl border border-[#1A2C7B]/30 shadow-xl overflow-hidden">
                <div class="bg-gradient-to-r from-blue-500/10 to-transparent p-5 border-b border-[#1A2C7B]/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 class="text-lg font-bold text-blue-400 flex items-center gap-2">
                            <i data-lucide="calendar"></i>
                            ประวัติบันทึกการเข้า-ออกโรงงานทั้งหมด
                        </h2>
                        <p class="text-xs text-slate-400 mt-1">ประวัติรายการที่ทำรายการครบทั้งขั้นตอน Check-In และ Check-Out แล้ว</p>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="exportHistoryToCSV()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-1.5 shadow-md shadow-blue-500/10 transition-all">
                            <i data-lucide="download" class="w-4 h-4"></i>
                            ส่งออกไฟล์ CSV (Excel)
                        </button>
                        <button onclick="openClearConfirmModal()" class="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-1.5 transition-all">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                            ล้างประวัติทั้งหมด
                        </button>
                    </div>
                </div>

                <div class="p-6">
                    <div class="overflow-x-auto rounded-xl border border-[#1A2C7B]">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-[#080E21] border-b border-[#1A2C7B] text-xs font-bold uppercase tracking-wider text-slate-300">
                                    <th class="p-4">เวลาเข้า - เวลาออก</th>
                                    <th class="p-4">สาขาโรงงาน</th>
                                    <th class="p-4">ผู้เข้าปฏิบัติงาน</th>
                                    <th class="p-4">สังกัด / รายละเอียดงาน</th>
                                    <th class="p-4">ผู้อนุญาต / เจ้าหน้าที่ รปภ.</th>
                                    <th class="p-4 text-center">รูปถ่าย (In/Out)</th>
                                </tr>
                            </thead>
                            <tbody id="history-list-body" class="divide-y divide-[#1A2C7B]/60 text-sm">
                                <tr>
                                    <td colspan="6" class="p-8 text-center text-slate-500">
                                        ไม่พบประวัติข้อมูลเข้า-ออกโรงงาน
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>


        <!-- TAB 4: GOOGLE SHEETS & CLOUD INTEGRATION -->
        <section id="content-integration" class="tab-content hidden">
            <div class="bg-[#121B33] rounded-2xl border border-[#1A2C7B]/30 shadow-xl overflow-hidden">
                <div class="bg-gradient-to-r from-violet-500/10 to-transparent p-5 border-b border-[#1A2C7B]/50">
                    <h2 class="text-lg font-bold text-violet-400 flex items-center gap-2">
                        <i data-lucide="cloud-lightning"></i>
                        การเชื่อมต่อฐานข้อมูลภายนอก (Google Sheets & Google Drive API)
                    </h2>
                    <p class="text-xs text-slate-400 mt-1">คุณสามารถลิงก์แอปพลิเคชันนี้เพื่อส่งข้อมูลจริงไปสเปรดชีตหลักของคุณได้โดยกรอก Webhook URL ด้านล่าง</p>
                </div>

                <div class="p-6 space-y-6">
                    <!-- Webhook Settings -->
                    <div class="bg-[#0D1630] border border-[#1A2C7B] p-5 rounded-2xl">
                        <h3 class="text-sm font-bold text-slate-200 mb-3 flex items-center gap-1.5">
                            <i data-lucide="link" class="w-4 h-4 text-[#82C341]"></i>
                            ตั้งค่า Google Sheets API Endpoint
                        </h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-xs font-semibold text-slate-400 mb-1.5">Google Web App Webhook URL (จาก Google Apps Script)</label>
                                <input type="url" id="webhook-url" placeholder="https://script.google.com/macros/s/XXXXX/exec"
                                    class="w-full px-4 py-2.5 bg-[#080E21] border border-[#1A2C7B] rounded-xl focus:outline-none focus:border-[#82C341] text-slate-100 text-sm font-mono" />
                                <span class="text-[10px] text-slate-500 mt-1 block">เมื่อบันทึกข้อมูล Check-In และ Check-Out ข้อมูลจะถูกจัดส่งไปยัง URL สเปรดชีตข้างต้นโดยอัตโนมัติ</span>
                            </div>
                            <div class="flex justify-end">
                                <button onclick="saveWebhookSettings()" class="bg-[#82C341] hover:bg-[#6FA835] text-[#0B132B] font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 transition-all">
                                    <i data-lucide="save" class="w-3.5 h-3.5"></i>
                                    บันทึกค่าเชื่อมต่อ API
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Steps Guide -->
                    <div class="space-y-4 text-sm text-slate-300">
                        <h3 class="font-bold text-base text-slate-200 border-b border-[#1A2C7B] pb-2">วิธีตั้งค่าให้ข้อมูลซิงก์เข้า Google Sheets ของคุณจริง ๆ</h3>
                        <ol class="list-decimal list-inside space-y-3 pl-2">
                            <li>เปิดไฟล์สเปรดชีต <a href="https://docs.google.com/spreadsheets/d/1ToW67TWoHHDtSFctATiGUt3FBR_d9kIATteR3XoD0FU/edit" target="_blank" class="text-[#82C341] hover:underline font-semibold">1ToW67TWoHHDtSFctAT... (สเปรดชีตข้อมูลของคุณ)</a></li>
                            <li>ไปที่เมนู <strong>ส่วนขยาย (Extensions)</strong> &gt; <strong>App Script</strong></li>
                            <li>ก๊อปปี้โค้ด Google Apps Script ด้านล่างนี้ไปวางในหน้าต่างสคริปต์:</li>
                        </ol>

                        <!-- Apps Script Code block for copy pasting -->
                        <div class="relative bg-[#080E21] p-4 rounded-xl border border-[#1A2C7B] font-mono text-xs text-emerald-400 overflow-x-auto">
                            <pre id="apps-script-code">
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById("1ToW67TWoHHDtSFctATiGUt3FBR_d9kIATteR3XoD0FU").getActiveSheet();
    
    if (data.action === "checkin") {
      sheet.appendRow([
        data.id,
        data.checkInTime,
        data.factoryBranch,
        data.orgType === "employee" ? "พนักงานบริษัท PYRO" : "บุคคลภายนอก",
        data.organizationName || "-",
        data.workerName,
        data.phoneNumber,
        data.carLicense,
        data.workerCount,
        data.jobDetails,
        data.imgWorkerName, 
        data.imgCarName,
        "-", 
        "-", 
        "-", 
        "กำลังปฏิบัติงาน"
      ]);
      return ContentService.createTextOutput(JSON.stringify({result: "success", id: data.id})).setMimeType(ContentService.MimeType.JSON);
    } 
    
    else if (data.action === "checkout") {
      var rows = sheet.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][0] === data.id) {
          sheet.getRange(i + 1, 13).setValue(data.imgAfterJobName); 
          sheet.getRange(i + 1, 14).setValue(data.approverName);
          sheet.getRange(i + 1, 15).setValue(data.guardName);
          sheet.getRange(i + 1, 16).setValue("เสร็จสิ้นขั้นตอน (Check-Out) เมื่อ " + data.checkOutTime);
          break;
        }
      }
      return ContentService.createTextOutput(JSON.stringify({result: "success"})).setMimeType(ContentService.MimeType.JSON);
    }
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", message: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}</pre>
                            <button onclick="copyAppsScriptCode()" class="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded border border-slate-750 flex items-center gap-1">
                                <i data-lucide="copy" class="w-3.5 h-3.5"></i> คัดลอกโค้ด
                            </button>
                        </div>

                        <ol class="list-decimal list-inside space-y-3 pl-2" start="4">
                            <li>กดปุ่ม <strong>การทำให้ใช้งานได้ (Deploy)</strong> &gt; <strong>การทำให้ใช้งานได้ใหม่ (New deployment)</strong></li>
                            <li>เลือกประเภทเป็น <strong>เว็บแอป (Web app)</strong></li>
                            <li>ตั้งค่าสิทธิ์เข้าถึง: ผู้มีสิทธิ์เข้าใช้งานให้เลือกเป็น <strong>"ทุกคน" (Anyone)</strong> จากนั้นกดปุ่มทำให้ใช้งานได้</li>
                            <li>คัดลอก URL ของเว็บแอปที่ได้ มากรอกลงในฟิลด์ <strong>"Webhook URL"</strong> ด้านบนเพื่อเชื่อมต่อระบบได้ทันที!</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>

    </main>


    <!-- MODAL: CHECK OUT CONFIRMATION (With fields 12-14 requirement) -->
    <div id="checkout-modal" class="hidden fixed inset-0 z-50 bg-[#080E21]/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[#121B33] border border-[#1A2C7B] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <!-- Modal Header -->
            <div class="bg-gradient-to-r from-emerald-500/10 to-transparent p-5 border-b border-[#1A2C7B]/50 flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-bold text-[#82C341] flex items-center gap-2">
                        <i data-lucide="log-out"></i>
                        ฟอร์มสำหรับ Check Out ออกจากโรงงาน
                    </h3>
                    <p class="text-xs text-slate-400 mt-0.5">กรุณากรอกข้อมูลข้อ 12 - 14 ให้เสร็จสมบูรณ์ก่อนปล่อยออกจากพื้นที่</p>
                </div>
                <button onclick="closeCheckoutModal()" class="text-slate-400 hover:text-slate-200">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>

            <!-- Modal Form -->
            <form id="checkOutForm" onsubmit="submitCheckOut(event)" class="p-6 space-y-5 flex-1">
                <!-- Keep tracking hidden id of visitor -->
                <input type="hidden" id="checkout-visitor-id" />

                <!-- Summary Info of Visitor -->
                <div class="p-4 bg-[#080E21] rounded-xl border border-[#1A2C7B]/50 text-sm space-y-2 grid grid-cols-2 gap-2">
                    <div class="col-span-2 border-b border-[#1A2C7B] pb-2 flex justify-between items-center">
                        <span class="text-xs font-bold text-slate-400">รายละเอียดใบ Check-In</span>
                        <span id="co-time-in" class="text-xs text-[#82C341] font-mono">-</span>
                    </div>
                    <div>
                        <span class="text-slate-500 text-xs block">โรงงาน / สาขา</span>
                        <span id="co-branch" class="font-semibold text-slate-300">-</span>
                    </div>
                    <div>
                        <span class="text-slate-500 text-xs block">ชื่อผู้ปฏิบัติงาน</span>
                        <span id="co-worker" class="font-semibold text-slate-300">-</span>
                    </div>
                    <div>
                        <span class="text-slate-500 text-xs block">ป้ายทะเบียนรถ</span>
                        <span id="co-license" class="font-semibold text-slate-300">-</span>
                    </div>
                    <div>
                        <span class="text-slate-500 text-xs block">ประเภทงาน</span>
                        <span id="co-job" class="font-semibold text-slate-300">-</span>
                    </div>
                </div>

                <!-- 12. ภาพถ่ายหลังปฏิบัติงาน -->
                <div>
                    <label class="block text-sm font-semibold text-slate-300 mb-2">12. ภาพถ่ายหลังจากปฏิบัติงานเสร็จเรียบร้อย <span class="text-rose-500">*</span></label>
                    <div class="flex flex-col items-center justify-center p-4 bg-[#080E21] border-2 border-dashed border-[#1A2C7B] rounded-2xl hover:border-[#82C341]/50 transition-all relative">
                        <input type="file" id="imgAfterJob" accept="image/*" capture="environment" required onchange="previewImage(this, 'preview-after-job')"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div id="container-preview-after-job" class="text-center">
                            <div class="bg-[#121B33] p-2.5 rounded-full inline-block text-[#82C341] mb-2">
                                <i data-lucide="camera" class="w-7 h-7"></i>
                            </div>
                            <p class="text-sm font-semibold">เปิดกล้องถ่ายภาพหลังการทำงาน</p>
                            <p class="text-xs text-slate-500 mt-1">รูปถ่ายความเรียบร้อยของหน้างาน/บริเวณทำงาน</p>
                        </div>
                        <img id="preview-after-job" class="hidden max-h-[160px] w-auto rounded-lg object-contain shadow-lg border border-[#1A2C7B] mt-1 z-20" />
                        <button type="button" id="btn-clear-after" onclick="clearPhoto('imgAfterJob', 'preview-after-job')" class="hidden absolute top-2 right-2 bg-rose-600 hover:bg-rose-700 text-white p-1.5 rounded-full z-30 transition-all">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- 13. ผู้อนุญาตให้เข้าปฏิบัติงาน -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-300 mb-1.5">13. ผู้อนุญาตให้ปฏิบัติงาน (ชื่อผู้จ้าง/หัวหน้างาน) <span class="text-rose-500">*</span></label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <i data-lucide="award" class="w-4 h-4"></i>
                            </span>
                            <input type="text" id="approverName" required placeholder="ชื่อ-นามสกุล ผู้อนุญาต"
                                class="w-full pl-9 pr-4 py-2.5 bg-[#080E21] border border-[#1A2C7B] rounded-xl focus:outline-none focus:border-[#82C341] text-slate-100 text-sm" />
                        </div>
                    </div>

                    <!-- 14. ชื่อเจ้าหน้าที่ รปภ. -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-300 mb-1.5">14. ชื่อเจ้าหน้าที่ รปภ. ผู้ทำรายการออก <span class="text-rose-500">*</span></label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <i data-lucide="user-check" class="w-4 h-4"></i>
                            </span>
                            <input type="text" id="guardName" required placeholder="ชื่อเจ้าหน้าที่ รปภ. ที่เข้าเวร"
                                class="w-full pl-9 pr-4 py-2.5 bg-[#080E21] border border-[#1A2C7B] rounded-xl focus:outline-none focus:border-[#82C341] text-slate-100 text-sm" />
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="pt-4 border-t border-[#1A2C7B] flex flex-col-reverse sm:flex-row justify-end gap-3">
                    <button type="button" onclick="closeCheckoutModal()" class="w-full sm:w-auto px-5 py-2.5 bg-[#0D1630] hover:bg-[#121B33] rounded-xl text-sm font-semibold transition-all">
                        ยกเลิก
                    </button>
                    <button type="submit" class="w-full sm:w-auto px-6 py-2.5 bg-[#82C341] hover:bg-[#6FA835] text-[#0B132B] font-bold rounded-xl text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-[#82C341]/10 transition-all">
                        <i data-lucide="log-out" class="w-4 h-4"></i>
                        ยืนยันการบันทึก Check-Out
                    </button>
                </div>
            </form>
        </div>
    </div>


    <!-- CUSTOM CONFIRM MODAL (NO NATIVE CONFIRM) -->
    <div id="confirm-modal" class="hidden fixed inset-0 z-50 bg-[#080E21]/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[#121B33] border border-rose-500/40 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div class="flex items-center gap-3 text-rose-400">
                <i data-lucide="alert-triangle" class="w-8 h-8"></i>
                <h3 class="text-lg font-bold">ยืนยันการล้างข้อมูลประวัติ?</h3>
            </div>
            <p class="text-sm text-slate-300">คุณต้องการยืนยันการล้างข้อมูลประวัติและผู้เข้าปฏิบัติงานทั้งหมดออกจากเครื่องใช่หรือไม่? <br><span class="text-rose-400 font-semibold">(ข้อมูลที่ถูกซิงก์เข้าระบบ Google Sheets จะไม่ได้รับผลกระทบ)</span></p>
            <div class="flex justify-end gap-3">
                <button onclick="closeClearConfirmModal()" class="px-4 py-2 bg-[#0D1630] hover:bg-[#121B33] rounded-xl text-xs font-semibold text-slate-300 transition-all">ยกเลิก</button>
                <button onclick="confirmClearAllHistory()" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-xl text-xs font-bold text-white shadow-lg shadow-rose-600/25 transition-all">ล้างข้อมูลทั้งหมด</button>
            </div>
        </div>
    </div>


    <!-- MODAL: IMAGE PREVIEW FOR GALLERIES -->
    <div id="image-modal" class="hidden fixed inset-0 z-50 bg-[#080E21]/95 flex items-center justify-center p-4">
        <div class="relative max-w-3xl w-full flex flex-col items-center">
            <button onclick="closeImageModal()" class="absolute -top-12 right-0 text-white hover:text-[#82C341] transition-all flex items-center gap-1 font-bold text-sm bg-[#121B33]/60 px-3 py-1.5 rounded-full">
                <i data-lucide="x" class="w-5 h-5"></i> ปิดภาพขยาย
            </button>
            <img id="image-modal-src" class="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl border border-[#1A2C7B]" src="" />
            <p id="image-modal-caption" class="text-sm font-semibold text-slate-300 mt-4 text-center"></p>
        </div>
    </div>


    <!-- NOTIFICATION SYSTEM TO REPLACE NATIVE ALERTS -->
    <div id="toast" class="fixed bottom-5 right-5 z-50 transform translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-3 bg-[#080E21] border px-5 py-4 rounded-xl shadow-2xl max-w-md w-full">
        <div id="toast-icon" class="p-2 rounded-lg"></div>
        <div>
            <h4 id="toast-title" class="font-bold text-sm"></h4>
            <p id="toast-message" class="text-xs text-slate-400 mt-0.5"></p>
        </div>
    </div>


    <!-- APPLICATION LOGIC / JAVASCRIPT -->
    <script>
        // Storage configuration keys
        const STRG_KEY_ACTIVE = 'pyro_active_checkins';
        const STRG_KEY_HISTORY = 'pyro_history_logs';
        const STRG_KEY_WEBHOOK = 'pyro_webhook_url';

        // Initialize state variables
        let activeVisitors = [];
        let completedHistory = [];
        let webhookUrl = '';

        // Run application setup on window loaded
        window.addEventListener('load', () => {
            // Load state from localstorage
            const loadedActive = localStorage.getItem(STRG_KEY_ACTIVE);
            if (loadedActive) activeVisitors = JSON.parse(loadedActive);

            const loadedHistory = localStorage.getItem(STRG_KEY_HISTORY);
            if (loadedHistory) completedHistory = JSON.parse(loadedHistory);

            const loadedWebhook = localStorage.getItem(STRG_KEY_WEBHOOK);
            if (loadedWebhook) {
                webhookUrl = loadedWebhook;
                document.getElementById('webhook-url').value = webhookUrl;
            }

            // Bind dynamic Lucide icons
            lucide.createIcons();

            // Setup real-time current clock to form
            updateCurrentTime();
            setInterval(updateCurrentTime, 1000);

            // Re-render interfaces
            renderActiveTable();
            renderHistoryTable();
            updateCounters();
        });

        // 1. Manage automatic date and time
        function updateCurrentTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const date = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            const thaiFormat = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
            const timeField = document.getElementById('checkInTime');
            if (timeField) {
                timeField.value = thaiFormat;
            }
        }

        // 2. Hide "Organization Name" (Field 4) condition based on orgType
        function toggleOrganizationField() {
            const selectedType = document.querySelector('input[name="orgType"]:checked').value;
            const container = document.getElementById('orgNameContainer');
            const orgInput = document.getElementById('organizationName');
            
            if (selectedType === 'employee') {
                container.classList.add('hidden');
                orgInput.required = false;
                orgInput.value = '';
            } else {
                container.classList.remove('hidden');
                orgInput.required = true;
            }
        }

        // 3. Hide/Show "Other Job Type text input"
        function toggleOtherJobInput() {
            const isOther = document.querySelector('input[name="jobDetails"]:checked').value === 'อื่นๆ';
            const container = document.getElementById('otherJobContainer');
            const otherText = document.getElementById('otherJobText');
            if (isOther) {
                container.classList.remove('hidden');
                otherText.required = true;
            } else {
                container.classList.add('hidden');
                otherText.required = false;
                otherText.value = '';
            }
        }

        // Allow styling radio cards dynamically to logo-theme green highlights
        document.querySelectorAll('input[name="jobDetails"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                document.querySelectorAll('.job-option').forEach(el => {
                    el.classList.remove('border-[#82C341]', 'bg-[#121B33]');
                    el.classList.add('border-[#1A2C7B]', 'bg-[#0D1630]');
                });
                
                if (e.target.checked) {
                    const parent = e.target.closest('.job-option');
                    parent.classList.add('border-[#82C341]', 'bg-[#121B33]');
                    parent.classList.remove('border-[#1A2C7B]', 'bg-[#0D1630]');
                }
                toggleOtherJobInput();
            });
        });

        // Setup active selection state visual on startup
        document.querySelector('input[name="jobDetails"]:checked').closest('.job-option').classList.add('border-[#82C341]', 'bg-[#121B33]');

        // 4. Handle file previews and base64 conversion
        function previewImage(input, previewId) {
            const file = input.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                const previewImg = document.getElementById(previewId);
                const containerId = 'container-' + previewId;
                const clearBtnId = 'btn-clear-' + (previewId.replace('preview-', ''));

                document.getElementById(containerId).classList.add('hidden');
                previewImg.src = e.target.result;
                previewImg.classList.remove('hidden');
                document.getElementById(clearBtnId).classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }

        function clearPhoto(inputId, previewId) {
            const input = document.getElementById(inputId);
            const previewImg = document.getElementById(previewId);
            const containerId = 'container-' + previewId;
            const clearBtnId = 'btn-clear-' + (previewId.replace('preview-', ''));

            input.value = '';
            previewImg.src = '';
            previewImg.classList.add('hidden');
            document.getElementById(containerId).classList.remove('hidden');
            document.getElementById(clearBtnId).classList.add('hidden');
        }

        // 5. Submit Check-In Action
        document.getElementById('checkInForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            // Extract Form Values
            const timeIn = document.getElementById('checkInTime').value;
            const branch = document.getElementById('factoryBranch').value;
            const orgType = document.querySelector('input[name="orgType"]:checked').value;
            const orgName = orgType === 'employee' ? 'บริษัท PYRO (พนักงาน)' : document.getElementById('organizationName').value;
            const worker = document.getElementById('workerName').value;
            const phone = document.getElementById('phoneNumber').value;
            const license = document.getElementById('carLicense').value;
            const count = parseInt(document.getElementById('workerCount').value);
            
            let job = document.querySelector('input[name="jobDetails"]:checked').value;
            if (job === 'อื่นๆ') {
                job = 'อื่นๆ: ' + document.getElementById('otherJobText').value;
            }

            // Convert images to base64 string for offline storage and cloud submission
            const workerPhotoBase64 = document.getElementById('preview-worker').src;
            const carPhotoBase64 = document.getElementById('preview-car').src;

            // Generate unique record id
            const entryId = 'PYRO-' + Date.now();

            const checkInRecord = {
                id: entryId,
                checkInTime: timeIn,
                factoryBranch: branch,
                orgType: orgType,
                organizationName: orgName,
                workerName: worker,
                phoneNumber: phone,
                carLicense: license,
                workerCount: count,
                jobDetails: job,
                imgWorker: workerPhotoBase64,
                imgCar: carPhotoBase64,
                status: 'In-Progress'
            };

            // Add record to state
            activeVisitors.push(checkInRecord);
            localStorage.setItem(STRG_KEY_ACTIVE, JSON.stringify(activeVisitors));

            // Show Feedback Toast
            showToast('บันทึกสำเร็จ', `คุณ ${worker} ดำเนินการ Check-In เรียบร้อย`, 'success');

            // Send payload to Google Sheets webhook if setup
            if (webhookUrl) {
                sendToCloudWebhook({
                    action: 'checkin',
                    ...checkInRecord,
                    imgWorkerName: "[รูปถ่ายผู้ปฏิบัติงาน]",
                    imgCarName: "[รูปถ่ายรถยนต์]"
                });
            }

            // Reset and refresh
            this.reset();
            clearPhoto('imgWorker', 'preview-worker');
            clearPhoto('imgCar', 'preview-car');
            document.querySelector('input[name="orgType"][value="employee"]').checked = true;
            toggleOrganizationField();

            // Update UI
            renderActiveTable();
            updateCounters();
            switchTab('active-visitors');
        });

        // 6. Manage Tab switching
        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('block');
            });
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('border-[#82C341]', 'text-[#82C341]');
                btn.classList.add('border-transparent', 'text-slate-400');
            });

            document.getElementById('content-' + tabId).classList.add('block');
            document.getElementById('content-' + tabId).classList.remove('hidden');
            
            const activeTabButton = document.getElementById('tab-' + tabId);
            activeTabButton.classList.add('border-[#82C341]', 'text-[#82C341]');
            activeTabButton.classList.remove('border-transparent', 'text-slate-400');
        }

        // Render Active List inside table with PYRO Branding highlights
        function renderActiveTable() {
            const tbody = document.getElementById('active-list-body');
            tbody.innerHTML = '';

            if (activeVisitors.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" class="p-8 text-center text-slate-500">
                            <i data-lucide="info" class="w-10 h-10 mx-auto text-slate-600 mb-2"></i>
                            ไม่พบข้อมูลผู้ปฏิบัติงานค้างอยู่ในขณะนี้
                        </td>
                    </tr>
                `;
                lucide.createIcons();
                return;
            }

            activeVisitors.forEach(record => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-[#121B33]/60 border-b border-[#1A2C7B]/40 transition-all';
                tr.innerHTML = `
                    <td class="p-4 font-mono text-xs font-semibold text-[#82C341]">${record.checkInTime}</td>
                    <td class="p-4 font-bold text-slate-200">${record.factoryBranch}</td>
                    <td class="p-4">
                        <div class="font-semibold text-slate-200">${record.workerName}</div>
                        <div class="text-xs text-slate-400">เบอร์โทร: ${record.phoneNumber} | ทะเบียน: ${record.carLicense}</div>
                    </td>
                    <td class="p-4">
                        <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#0D1630] border border-[#1A2C7B] text-[#82C341]">${record.organizationName}</span>
                    </td>
                    <td class="p-4">
                        <div class="text-xs text-slate-300 font-semibold max-w-[150px] truncate">${record.jobDetails}</div>
                        <div class="text-[10px] text-slate-500">จำนวน: ${record.workerCount} คน</div>
                    </td>
                    <td class="p-4 text-center">
                        <button onclick="openCheckoutModal('${record.id}')" class="bg-[#82C341] hover:bg-[#6FA835] text-[#0B132B] font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1 mx-auto shadow-md shadow-[#82C341]/10 transition-all">
                            <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
                            ลงเวลาออก (Check-Out)
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            lucide.createIcons();
        }

        // Render History list inside table with brand elements
        function renderHistoryTable() {
            const tbody = document.getElementById('history-list-body');
            tbody.innerHTML = '';

            if (completedHistory.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" class="p-8 text-center text-slate-500">
                            ไม่มีประวัติผู้เข้า-ออกโรงงาน
                        </td>
                    </tr>
                `;
                return;
            }

            completedHistory.forEach(record => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-[#121B33]/20 border-b border-[#1A2C7B]/30 transition-all text-xs';
                tr.innerHTML = `
                    <td class="p-4 font-mono space-y-1">
                        <div class="text-[#82C341]"><span class="font-bold">เข้า:</span> ${record.checkInTime}</div>
                        <div class="text-emerald-400"><span class="font-bold">ออก:</span> ${record.checkOutTime}</div>
                    </td>
                    <td class="p-4 font-semibold text-slate-300">${record.factoryBranch}</td>
                    <td class="p-4 space-y-0.5">
                        <div class="font-bold text-slate-200 text-sm">${record.workerName}</div>
                        <div class="text-slate-400">โทร: ${record.phoneNumber} | ทะเบียน: ${record.carLicense}</div>
                    </td>
                    <td class="p-4 space-y-1">
                        <div class="text-slate-400">สังกัด: <span class="font-bold text-slate-300">${record.organizationName}</span></div>
                        <div class="bg-[#0D1630] border border-[#1A2C7B] px-2 py-1 rounded inline-block text-[11px] text-[#82C341]">งาน: ${record.jobDetails}</div>
                    </td>
                    <td class="p-4 space-y-1">
                        <div class="text-slate-400">ผู้รับรอง: <span class="text-slate-300 font-semibold">${record.approverName}</span></div>
                        <div class="text-slate-500">รปภ.ผู้ทำรายการ: ${record.guardName}</div>
                    </td>
                    <td class="p-4 text-center">
                        <div class="flex items-center justify-center gap-1.5">
                            <button onclick="zoomImage('${record.imgWorker}', 'ผู้ปฏิบัติงาน: ${record.workerName}')" class="bg-[#080E21] hover:bg-[#121B33] p-1.5 rounded-lg border border-[#1A2C7B] text-slate-300" title="รูปคนเข้า">
                                <i data-lucide="user" class="w-4 h-4"></i>
                            </button>
                            <button onclick="zoomImage('${record.imgCar}', 'พาหนะทะเบียน: ${record.carLicense}')" class="bg-[#080E21] hover:bg-[#121B33] p-1.5 rounded-lg border border-[#1A2C7B] text-slate-300" title="รูปยานพาหนะ">
                                <i data-lucide="truck" class="w-4 h-4"></i>
                            </button>
                            <button onclick="zoomImage('${record.imgAfterJob}', 'รูปเสร็จงาน: ${record.workerName}')" class="bg-[#080E21] hover:bg-[#121B33] p-1.5 rounded-lg border border-[#1A2C7B] text-emerald-400" title="รูปหลังทำงาน">
                                <i data-lucide="shield-check" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            lucide.createIcons();
        }

        // Live filtering inside tables
        function filterActiveTable() {
            const keyword = document.getElementById('activeSearch').value.toLowerCase();
            const rows = document.querySelectorAll('#active-list-body tr');
            
            rows.forEach(row => {
                if (row.cells.length < 2) return; // ignore placeholder rows
                const text = row.textContent.toLowerCase();
                if (text.includes(keyword)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        // Update active counters badges
        function updateCounters() {
            const activeCount = activeVisitors.length;
            document.getElementById('counter-active').innerText = activeCount;
            document.getElementById('counter-completed').innerText = completedHistory.filter(h => {
                const today = new Date().toISOString().split('T')[0];
                return h.checkOutTime.startsWith(today);
            }).length;

            const badge = document.getElementById('badge-active-count');
            if (activeCount > 0) {
                badge.innerText = activeCount;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }

        // 7. Modal management for Check-Out (Requirement validation)
        function openCheckoutModal(id) {
            const record = activeVisitors.find(r => r.id === id);
            if (!record) return;

            // Set dynamic metadata inside check out modal
            document.getElementById('checkout-visitor-id').value = id;
            document.getElementById('co-time-in').innerText = "เข้าเมื่อ: " + record.checkInTime;
            document.getElementById('co-branch').innerText = record.factoryBranch;
            document.getElementById('co-worker').innerText = record.workerName;
            document.getElementById('co-license').innerText = record.carLicense;
            document.getElementById('co-job').innerText = record.jobDetails;

            // Clear check-out form fields
            document.getElementById('checkOutForm').reset();
            clearPhoto('imgAfterJob', 'preview-after-job');

            // Open Modal
            document.getElementById('checkout-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeCheckoutModal() {
            document.getElementById('checkout-modal').classList.add('hidden');
            document.body.style.overflow = '';
        }

        // Submit Check Out logic (Handling Fields 12-14)
        async function submitCheckOut(event) {
            event.preventDefault();

            const id = document.getElementById('checkout-visitor-id').value;
            const recordIndex = activeVisitors.findIndex(r => r.id === id);
            if (recordIndex === -1) return;

            const record = activeVisitors[recordIndex];

            // Get Current Checkout Time
            const now = new Date();
            const checkOutTimeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            // Required Check-out Form parameters (12-14)
            const imgAfterJobBase64 = document.getElementById('preview-after-job').src;
            const approver = document.getElementById('approverName').value;
            const guard = document.getElementById('guardName').value;

            // Build completed checkout model
            const finalRecord = {
                ...record,
                checkOutTime: checkOutTimeStr,
                imgAfterJob: imgAfterJobBase64,
                approverName: approver,
                guardName: guard,
                status: 'Completed'
            };

            // Remove from active lists and store into completed history lists
            activeVisitors.splice(recordIndex, 1);
            completedHistory.unshift(finalRecord);

            // Sync with local Storage
            localStorage.setItem(STRG_KEY_ACTIVE, JSON.stringify(activeVisitors));
            localStorage.setItem(STRG_KEY_HISTORY, JSON.stringify(completedHistory));

            // Show confirmation toast
            showToast('บันทึกออกสำเร็จ', `คุณ ${finalRecord.workerName} ได้ทำรายการ Check-Out เรียบร้อยแล้ว`, 'info');

            // Post Checkout Data to Sheets webhook if setup
            if (webhookUrl) {
                sendToCloudWebhook({
                    action: 'checkout',
                    id: finalRecord.id,
                    checkOutTime: finalRecord.checkOutTime,
                    imgAfterJobName: "[รูปถ่ายหลังทำงานเสร็จ]",
                    approverName: finalRecord.approverName,
                    guardName: finalRecord.guardName
                });
            }

            // Close modal & Refresh UI
            closeCheckoutModal();
            renderActiveTable();
            renderHistoryTable();
            updateCounters();
            switchTab('history');
        }

        // 8. Integration API trigger to Sheets
        function saveWebhookSettings() {
            const urlInput = document.getElementById('webhook-url').value.trim();
            if (urlInput === '') {
                localStorage.removeItem(STRG_KEY_WEBHOOK);
                webhookUrl = '';
                showToast('ยกเลิกเชื่อมต่อ', 'นำ URL การซิงก์ข้อมูลสเปรดชีตออกแล้ว', 'info');
            } else {
                localStorage.setItem(STRG_KEY_WEBHOOK, urlInput);
                webhookUrl = urlInput;
                showToast('เชื่อมต่อ API แล้ว', 'ระบบจะทำการส่งข้อมูลเหตุการณ์เข้าสู่สเปรดชีตทันทีหลังจากนี้', 'success');
            }
        }

        async function sendToCloudWebhook(payload) {
            try {
                // Post asynchronous payload to Google App Script using fetch
                await fetch(webhookUrl, {
                    method: 'POST',
                    mode: 'no-cors', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                console.log("Cloud synced", payload);
            } catch (err) {
                console.error("Cloud syncing error", err);
                showToast('การส่งข้อมูลขัดข้อง', 'ไม่สามารถเชื่อมต่อ Google Sheets Webhook ได้ แต่ข้อมูลถูกบันทึกออฟไลน์ในเครื่องเรียบร้อย', 'warning');
            }
        }

        function copyAppsScriptCode() {
            const codeText = document.getElementById('apps-script-code').innerText;
            const textarea = document.createElement('textarea');
            textarea.value = codeText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            showToast('คัดลอกสำเร็จ', 'คัดลอกโค้ดสคริปต์ Google Sheets ไปยังคลิปบอร์ดแล้ว', 'success');
        }

        // 9. Zooming image logic inside history list
        function zoomImage(base64Source, caption) {
            if (!base64Source || base64Source.trim() === '') {
                showToast('ไม่พบรูปภาพ', 'ไม่มีรูปภาพที่จัดเก็บในรายการข้อมูลนี้', 'warning');
                return;
            }
            const modal = document.getElementById('image-modal');
            const img = document.getElementById('image-modal-src');
            const capt = document.getElementById('image-modal-caption');

            img.src = base64Source;
            capt.innerText = caption;
            modal.classList.remove('hidden');
        }

        function closeImageModal() {
            document.getElementById('image-modal').classList.add('hidden');
        }

        // 10. Export completed logs to Excel friendly CSV
        function exportHistoryToCSV() {
            if (completedHistory.length === 0) {
                showToast('ไม่มีข้อมูล', 'ไม่มีรายการประวัติที่จะทำการดาวน์โหลดได้', 'warning');
                return;
            }

            let csvContent = "\uFEFF"; 
            csvContent += "ID,วันเวลาเข้า,วันเวลาออก,โรงงาน/สาขา,ประเภทสังกัด,ชื่อบริษัท/หน่วยงาน,ผู้เข้าปฏิบัติงาน,เบอร์ติดต่อ,ทะเบียนรถ,จำนวนคนปฏิบัติงาน,รายละเอียดงาน,ผู้อนุญาตงาน,ชื่อรปภ\n";

            completedHistory.forEach(r => {
                const row = [
                    r.id,
                    r.checkInTime,
                    r.checkOutTime,
                    `"${r.factoryBranch}"`,
                    `"${r.orgType === 'employee' ? 'พนักงาน PYRO' : 'บุคคลภายนอก'}"`,
                    `"${r.organizationName}"`,
                    `"${r.workerName}"`,
                    `"${r.phoneNumber}"`,
                    `"${r.carLicense}"`,
                    r.workerCount,
                    `"${r.jobDetails}"`,
                    `"${r.approverName}"`,
                    `"${r.guardName}"`
                ].join(",");
                csvContent += row + "\n";
            });

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];

            link.setAttribute("href", url);
            link.setAttribute("download", `PYRO_Work_CheckIn_Report_${dateStr}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Beautiful Confirm modal instead of native confirm window
        function openClearConfirmModal() {
            document.getElementById('confirm-modal').classList.remove('hidden');
        }

        function closeClearConfirmModal() {
            document.getElementById('confirm-modal').classList.add('hidden');
        }

        function confirmClearAllHistory() {
            activeVisitors = [];
            completedHistory = [];
            localStorage.removeItem(STRG_KEY_ACTIVE);
            localStorage.removeItem(STRG_KEY_HISTORY);
            
            renderActiveTable();
            renderHistoryTable();
            updateCounters();
            closeClearConfirmModal();
            showToast('ล้างข้อมูลเรียบร้อย', 'ลบประวัติและข้อมูลออฟไลน์ทั้งหมดในเบราว์เซอร์แล้ว', 'info');
        }

        // Custom Toast notification
        function showToast(title, message, type = 'success') {
            const toast = document.getElementById('toast');
            const iconContainer = document.getElementById('toast-icon');
            const titleEl = document.getElementById('toast-title');
            const messageEl = document.getElementById('toast-message');

            if (type === 'success') {
                toast.className = "fixed bottom-5 right-5 z-50 transform translate-y-0 opacity-100 transition-all duration-300 flex items-center gap-3 bg-[#121B33] border border-[#82C341]/40 px-5 py-4 rounded-xl shadow-2xl max-w-md w-full";
                iconContainer.className = "p-2 rounded-lg bg-[#82C341]/10 text-[#82C341]";
                iconContainer.innerHTML = '<i data-lucide="check-circle" class="w-6 h-6"></i>';
                titleEl.className = "font-bold text-sm text-[#82C341]";
            } else if (type === 'info') {
                toast.className = "fixed bottom-5 right-5 z-50 transform translate-y-0 opacity-100 transition-all duration-300 flex items-center gap-3 bg-[#121B33] border border-blue-500/30 px-5 py-4 rounded-xl shadow-2xl max-w-md w-full";
                iconContainer.className = "p-2 rounded-lg bg-blue-500/10 text-blue-400";
                iconContainer.innerHTML = '<i data-lucide="info" class="w-6 h-6"></i>';
                titleEl.className = "font-bold text-sm text-blue-400";
            } else if (type === 'warning') {
                toast.className = "fixed bottom-5 right-5 z-50 transform translate-y-0 opacity-100 transition-all duration-300 flex items-center gap-3 bg-[#121B33] border border-rose-500/30 px-5 py-4 rounded-xl shadow-2xl max-w-md w-full";
                iconContainer.className = "p-2 rounded-lg bg-rose-500/10 text-rose-400";
                iconContainer.innerHTML = '<i data-lucide="alert-triangle" class="w-6 h-6"></i>';
                titleEl.className = "font-bold text-sm text-rose-400";
            }

            titleEl.innerText = title;
            messageEl.innerText = message;
            lucide.createIcons();

            setTimeout(() => {
                toast.className = "fixed bottom-5 right-5 z-50 transform translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-3 bg-[#080E21] border px-5 py-4 rounded-xl shadow-2xl max-w-md w-full";
            }, 4000);
        }
    </script>
</body>
</html>
