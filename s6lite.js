<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 483e8678b3f93284765122514296df9d14efa6f6
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");
const tabImageCounts = [5, 20]; // 첫 번째 탭: 5개, 두 번째 탭: 20개
let currentTabIndex = 0; // 현재 활성화된 탭 인덱스

// 스크롤 위치 저장 변수 추가
let scrollPosition = 0;

const stepDescriptions = {
  0: [ // 안드로이드 버전 확인
    "1. 화면을 아래에서 위로 끌어올려 앱 목록 화면으로 이동합니다.",
    "2. 설정 앱을 실행합니다.",
    "3. 설정 화면에서 태블릿 정보를 선택합니다.",
    "4. 소프트웨어 정보를 선택합니다.",
    "5. 안드로이드 버전을 확인합니다. <span style='color: #dc3545; font-weight: bold;'>*안드로이드 버전이 10 버전이 아닐 경우*</span>, 담당 선생님 혹은 밀크T 고객센터로 연락 부탁드립니다."
  ],
  1: [ // 런처 설치 (20개)
    "1. 화면을 아래에서 위로 끌어올려 앱 목록 화면으로 이동합니다.",
    "2. 오른쪽 위의 돋보기를 터치합니다.",
    "3. Chrome 앱을 검색하여 실행합니다.",
    "4. 주소창에 <strong>url.kr/5zqumj</strong>을 입력하여 밀크T런처 파일을 다운로드합니다.",
    "5. 크롬 앱을 닫고 메인 화면으로 이동하여 내 파일 앱을 실행합니다.",
    "6. 내 파일 앱에서 밀크T 런처 apk 파일을 터치한 후, '설정'을 터치합니다.",
    "7. 이 출처 허용 버튼을 터치하여 활성화한 후, 뒤로 가기를 터치합니다.",
    "8. '설치'를 터치하여 밀크T 홈을 설치합니다.",
    "9. 안전하지 않은 앱이 차단되었다는 문구가 나올 경우 세부정보 더보기 > 무시하고 설치하기 순서로 터치합니다.",
    "10. 밀크T 홈 설치가 완료되면 '열기'를 터치합니다.",
    "11. 아래의 권한을 허용하는 디바이스 관리자를 실행합니다.",
    "12. '항상 허용'을 눌러 밀크T 홈의 위치 액세스 권한을 허용합니다.",
    "13. '허용'을 눌러 밀크T 홈의 액세스 권한을 허용합니다.",
    "14. 가입한 서비스를 선택한 후 '다음'을 터치합니다.",
    "15. 와이파이 연결 확인, 배터리 상태 확인이 완료되면 '다음'을 터치합니다.",
    "16. 개인정보 수집, 이용동의서의 약관동의를 체크 후 확인을 터치합니다.",
    "17. 태블릿 시리얼 인증이 완료된 후 '다음'을 터치합니다.",
    "18. '설치 준비중'이 '설치하기'로 변경되면 터치합니다.",
    "19. 아래의 권한을 허용하는 디바이스 관리자를 실행합니다.",
    "20. 학습에 필요한 콘텐츠를 설치하는데는 상황에 따라 20분~50분 가량 소요됩니다. 콘텐츠 설치가 완료되면 '시작하기'를 터치하여 학습 이용 가능합니다."
  ]
};

// 이미지 아래 추가 설명 (특정 단계만)
const additionalNotes = {
  1: { // 런처 설치
    2: "Chrome(크롬) 앱을 최초 실행할 경우 'Chrome에 오신 것을 환영합니다'라는 창이 노출될 수 있습니다.<br>먼저 '사용 통계와 비정상 종료 보고서를 Google로 전송하여 Chrome을 개선하는 데 동참하세요' 체크박스의 체크를 해제해주세요.<br>이후 '동의하고 계속'을 터치하시면 '동기화를 사용하시겠습니까?'라고 묻는 창이 보입니다.<br><span style='color: #dc3545; font-weight: bold; display: block;'>동기화 여부는 밀크T 학습에 영향이 없습니다. '계정 추가'를 터치하여 구글 계정을 동기화해주시거나, '아니요, 괜찮습니다.'를 터치하여 진행 부탁드립니다.</span>",
    3: "주소를 입력하면 별도 페이지 이동 없이 파일이 다운로드됩니다. 다운로드시 크롬에서 권한 허용을 요청하는 창이 노출될 수 있습니다. <br><span style='color: #dc3545; font-weight: bold; display: block;'>정상적인 동작이니 '권한 업데이트'나 '허용', '계속'등을 눌러 진행해주세요.</span>",
    5: "'취소'와 '설정'이 보이지 않고 '확인'만 노출될 경우, 패밀리링크 앱에 의해 설치가 차단된 상황입니다. 학부모님의 휴대폰 앱에서 감독중지를 요청하여 학습생을 감독 대상에서 제외시켜 주세요. 이후 내 파일 앱에서 밀크T 런처 apk 파일을 터치하면 설치 진행 가능합니다.<br><span style='color: #dc3545; font-weight: bold; background-color: #fff3cd; padding: 2px 4px; border-radius: 3px;'>*패밀리링크의 감독 중지 방법은 밀크T에서 안내가 어렵습니다. 만약 감독 중지 진행이 어려우신 경우 구글 측으로 문의해주시기를 부탁드립니다.</span>",
    10: "밀크T 학습을 위한 필수 권한을 허용하는 것으로, 임의로 학습 데이터를 삭제하거나 기기 설정을 변경하는 것은 아닙니다.",
    13: "학습생의 실제 학년에 맞는 서비스를 선택해주세요.(예를 들어, 학습생이 6학년이라면 밀크T 초등 선택)",
    14: "'다음'이 보이지 않을 경우 와이파이 연결이 되지 않았거나 배터리가 30% 미만인 상황입니다. 충전기를 연결하면 배터리 30%가 되지 않더라도 '다음'버튼이 활성화됩니다.",
    16: "인증이 너무 오래 걸리거나 실패했다고 나온다면 와이파이 공유기 재부팅을 부탁드립니다.",
    18: "밀크T 학습을 위한 필수 권한을 허용하는 것으로, 임의로 학습 데이터를 삭제하거나 기기 설정을 변경하는 것는 아닙니다.",
    19: "밀크T와 함께해주셔서 감사합니다. 만약 설치 진행이<br>어려우시거나 정상적으로 설치가 되지 않는 경우에는,<br><span style='color: #dc3545; font-weight: bold; display: block;'>담당 선생님 혹은 밀크T 고객센터로 연락 부탁드립니다.</span>"
  }
};

// 이미지 로딩 상태 표시 함수
function showImageLoadingState(imgElement) {
  // 로딩 중 상태 표시
  imgElement.style.opacity = '0.7';
  imgElement.style.transition = 'opacity 0.3s ease';
  
  // 이미지 로드 완료시 원래 상태로 복원
  imgElement.onload = () => {
    imgElement.style.opacity = '1';
  };
  
  // 이미지 로드 실패시 처리
  imgElement.onerror = () => {
    imgElement.style.opacity = '0.5';
    imgElement.alt = '이미지를 불러올 수 없습니다';
  };
}

// 페이지 로드 시 초기 설정
window.addEventListener('load', function() {
  // URL에서 현재 탭 정보 확인
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  if (tabParam === '1') {
    currentTabIndex = 1;
    showTab(1);
  }
  
  generateScrollImages();
  updateNavigation();
});

function generateScrollImages() {
  for (let tabIndex = 0; tabIndex < 2; tabIndex++) {
    const container = document.getElementById(`scrollImages${tabIndex}`);
    container.innerHTML = '';
    const totalImages = tabImageCounts[tabIndex];
    
    // 안드로이드 버전 확인 탭(첫 번째 탭)에만 버전 안내 메시지 추가
    if (tabIndex === 0) {
      const versionNotice = document.createElement('div');
      versionNotice.className = 'version-notice';
      versionNotice.innerHTML = `
        <div class="notice-icon">!</div>
        <div class="notice-text">밀크T는 안드로이드 10 버전에서만 구동이 가능합니다. 안드로이드 10 버전이 아닐 경우 정상적인 학습이 불가능하여 버전 확인이 필요합니다.</div>
      `;
      container.appendChild(versionNotice);
    }
    
    for (let i = 1; i <= totalImages; i++) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'image-wrapper';
      
      // 단계 설명 텍스트 추가
      const stepText = document.createElement('div');
      stepText.className = 'step-text';
      stepText.innerHTML = stepDescriptions[tabIndex][i - 1] || `단계 ${i} 설명`;
      
      const img = document.createElement('img');
      img.src = getImageSrc('s6lite', tabIndex, i);
      img.alt = `단계 ${i}`;
      img.onclick = () => openModal('s6lite', tabIndex, i);
      img.className = 'scroll-image';
      
      // Lazy loading 속성 추가 (최신 브라우저 지원)
      img.loading = 'lazy';
      
      // 이미지 로딩 상태 표시
      showImageLoadingState(img);
      
      imageWrapper.appendChild(stepText);
      imageWrapper.appendChild(img);
      
      // 추가 설명이 있는 경우 이미지 아래에 추가
      if (additionalNotes[tabIndex] && additionalNotes[tabIndex][i - 1]) {
        const additionalNote = document.createElement('div');
        additionalNote.className = 'additional-note';
        additionalNote.innerHTML = additionalNotes[tabIndex][i - 1];
        imageWrapper.appendChild(additionalNote);
      }
      
      container.appendChild(imageWrapper);
    }
  }
}

function showTab(index) {
  currentTabIndex = index; // 현재 탭 인덱스 업데이트
  
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    contents[i].classList.toggle("active", i === index);
  });
  
  // URL에 현재 탭 정보 저장 (새로고침 시 유지하기 위해)
  const url = new URL(window.location);
  if (index === 0) {
    url.searchParams.delete('tab'); // 기본 탭이면 파라미터 제거
  } else {
    url.searchParams.set('tab', index);
  }
  window.history.replaceState({}, '', url);
  
  // 네비게이션 업데이트
  updateNavigation();
  
  // 페이지 이동 시 즉시 최상단으로 스크롤
  window.scrollTo(0, 0);
}

function updateNavigation() {
  const topNav = document.querySelector('.top-navigation');
  const nextBtn = document.getElementById('nextBtn');
  
  if (currentTabIndex === 0) {
    // 1. 안드로이드 버전 확인 탭 - 오른쪽 정렬, 다음 버튼만
    topNav.classList.remove('left-align');
    nextBtn.textContent = '다음 단계로 →';
    nextBtn.style.display = 'block';
  } else {
    // 2. 런처 설치 탭 - 왼쪽 정렬, 이전 버튼으로 변경
    topNav.classList.add('left-align');
    nextBtn.textContent = '← 이전 단계로';
    nextBtn.style.display = 'block';
  }
}

function handleNextClick() {
  if (currentTabIndex === 0) {
    // 1번 탭에서: 2번 탭으로 이동
    showTab(1);
  } else {
    // 2번 탭에서: 1번 탭으로 이동 (이전 단계로 기능)
    showTab(0);
  }
}

// 모달 관련 변수
let modalDevice = 's6lite';
let modalTabIndex = 0;
let modalSlideIndex = 1;

// 모달 함수들 - 스크롤 위치 저장/복원 기능 개선
function openModal(device, tabIndex, slideIndex) {
  modalDevice = device;
  modalTabIndex = tabIndex;
  modalSlideIndex = slideIndex;
  
  // 현재 스크롤 위치 저장
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  
  // 모달 이미지 설정
  modalImage.src = getImageSrc(device, tabIndex, slideIndex);
  
  // 모달 표시
  modal.style.display = "block";
  
  // body 스크롤 방지 강화
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
  
  // body 스크롤 복원
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  
  // 현재 모달에서 보고 있던 이미지에 맞는 스크롤 위치 계산
  const container = document.getElementById(`scrollImages${modalTabIndex}`);
  const imageWrappers = container.querySelectorAll('.image-wrapper');
  
  if (imageWrappers[modalSlideIndex - 1]) {
    const targetImageWrapper = imageWrappers[modalSlideIndex - 1];
    const rect = targetImageWrapper.getBoundingClientRect();
    const absoluteTop = rect.top + window.pageYOffset;
    
    // 헤더 높이(97px)를 고려하여 정확한 위치 계산
    const headerHeight = 97;
    const targetScrollPosition = Math.max(0, absoluteTop - headerHeight - 20);
    
    // 즉시 해당 위치로 이동 (애니메이션 없음)
    window.scrollTo(0, targetScrollPosition);
  } else {
    // 기본 스크롤 위치로 복원
    window.scrollTo(0, scrollPosition);
  }
}

function navigateModal(direction) {
  const maxSlides = tabImageCounts[modalTabIndex];
  modalSlideIndex += direction;
  
  // 모달에서도 순환 기능 적용
  if (modalSlideIndex < 1) {
    modalSlideIndex = maxSlides;
  }
  if (modalSlideIndex > maxSlides) {
    modalSlideIndex = 1;
  }
  
  const modalImage = document.getElementById("modalImage");
  modalImage.src = getImageSrc(modalDevice, modalTabIndex, modalSlideIndex);
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// 모달 배경 클릭 시 닫기
document.getElementById("imageModal").addEventListener('click', function(event) {
  if (event.target === this) {
    closeModal();
  }
});

function getImageSrc(device, tabIndex, slideIndex) {
  if (device === 's6lite' && tabIndex === 0) {
    // S6 Lite 안드로이드 버전 확인 (5장)
    if (slideIndex === 1) {
      // 1번 이미지는 s6 레포 사용 (런처 설치 탭과 동일하게 통일)
      return 'https://raw.githubusercontent.com/skyhigh79/s6/main/s6_launcher_install_01.png';
    } else if (slideIndex === 3) {
      // 3번 이미지는 adimage 레포 사용
      return 'https://raw.githubusercontent.com/skyhigh79/adimage/main/s6_android_check_03.png';
    } else if (slideIndex === 4) {
      // 4번 이미지는 ad 레포 사용 (기존 유지)
      return 'https://raw.githubusercontent.com/skyhigh79/ad/main/s6_android_check_04.png';
    } else {
      // 나머지는 기존 s6os 레포 이미지 사용
      const paddedIndex = slideIndex.toString().padStart(2, '0');
      return `https://raw.githubusercontent.com/skyhigh79/s6os/main/s6_android_check_${paddedIndex}.png`;
    }
  } else if (device === 's6lite' && tabIndex === 1) {
    // S6 Lite 런처 설치 (20장) - 새로운 s6 레포 사용
    const paddedIndex = slideIndex.toString().padStart(2, '0');
    return `https://raw.githubusercontent.com/skyhigh79/s6/main/s6_launcher_install_${paddedIndex}.png`;
  }
  
  // 기본값 (테스트용 이미지)
  return `https://raw.githubusercontent.com/skyhigh79/aa/main/ex.png`;
}

// 맨 위로 버튼 기능
const scrollToTopBtn = document.getElementById('scrollToTop');

// 스크롤 이벤트 리스너
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

// 맨 위로 스크롤 함수
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
<<<<<<< HEAD
}
=======
}
=======
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");
const tabImageCounts = [5, 20]; // 첫 번째 탭: 5개, 두 번째 탭: 20개
let currentTabIndex = 0; // 현재 활성화된 탭 인덱스

// 스크롤 위치 저장 변수 추가
let scrollPosition = 0;

const stepDescriptions = {
  0: [ // 안드로이드 버전 확인
    "1. 화면을 아래에서 위로 끌어올려 앱 목록 화면으로 이동합니다.",
    "2. 설정 앱을 실행합니다.",
    "3. 설정 화면에서 태블릿 정보를 선택합니다.",
    "4. 소프트웨어 정보를 선택합니다.",
    "5. 안드로이드 버전을 확인합니다. <span style='color: #dc3545; font-weight: bold;'>*안드로이드 버전이 10 버전이 아닐 경우*</span>, 담당 선생님 혹은 밀크T 고객센터로 연락 부탁드립니다."
  ],
  1: [ // 런처 설치 (20개)
    "1. 화면을 아래에서 위로 끌어올려 앱 목록 화면으로 이동합니다.",
    "2. 오른쪽 위의 돋보기를 터치합니다.",
    "3. Chrome 앱을 검색하여 실행합니다.",
    "4. 주소창에 <strong>url.kr/5zqumj</strong>을 입력하여 밀크T런처 파일을 다운로드합니다.",
    "5. 크롬 앱을 닫고 메인 화면으로 이동하여 내 파일 앱을 실행합니다.",
    "6. 내 파일 앱에서 밀크T 런처 apk 파일을 터치한 후, '설정'을 터치합니다.",
    "7. 이 출처 허용 버튼을 터치하여 활성화한 후, 뒤로 가기를 터치합니다.",
    "8. '설치'를 터치하여 밀크T 홈을 설치합니다.",
    "9. 안전하지 않은 앱이 차단되었다는 문구가 나올 경우 세부정보 더보기 > 무시하고 설치하기 순서로 터치합니다.",
    "10. 밀크T 홈 설치가 완료되면 '열기'를 터치합니다.",
    "11. 아래의 권한을 허용하는 디바이스 관리자를 실행합니다.",
    "12. '항상 허용'을 눌러 밀크T 홈의 위치 액세스 권한을 허용합니다.",
    "13. '허용'을 눌러 밀크T 홈의 액세스 권한을 허용합니다.",
    "14. 가입한 서비스를 선택한 후 '다음'을 터치합니다.",
    "15. 와이파이 연결 확인, 배터리 상태 확인이 완료되면 '다음'을 터치합니다.",
    "16. 개인정보 수집, 이용동의서의 약관동의를 체크 후 확인을 터치합니다.",
    "17. 태블릿 시리얼 인증이 완료된 후 '다음'을 터치합니다.",
    "18. '설치 준비중'이 '설치하기'로 변경되면 터치합니다.",
    "19. 아래의 권한을 허용하는 디바이스 관리자를 실행합니다.",
    "20. 학습에 필요한 콘텐츠를 설치하는데는 상황에 따라 20분~50분 가량 소요됩니다. 콘텐츠 설치가 완료되면 '시작하기'를 터치하여 학습 이용 가능합니다."
  ]
};

// 이미지 아래 추가 설명 (특정 단계만)
const additionalNotes = {
  1: { // 런처 설치
    2: "Chrome(크롬) 앱을 최초 실행할 경우 'Chrome에 오신 것을 환영합니다'라는 창이 노출될 수 있습니다.<br>먼저 '사용 통계와 비정상 종료 보고서를 Google로 전송하여 Chrome을 개선하는 데 동참하세요' 체크박스의 체크를 해제해주세요.<br>이후 '동의하고 계속'을 터치하시면 '동기화를 사용하시겠습니까?'라고 묻는 창이 보입니다.<br><span style='color: #dc3545; font-weight: bold; display: block;'>동기화 여부는 밀크T 학습에 영향이 없습니다. '계정 추가'를 터치하여 구글 계정을 동기화해주시거나, '아니요, 괜찮습니다.'를 터치하여 진행 부탁드립니다.</span>",
    3: "주소를 입력하면 별도 페이지 이동 없이 파일이 다운로드됩니다. 다운로드시 크롬에서 권한 허용을 요청하는 창이 노출될 수 있습니다. <br><span style='color: #dc3545; font-weight: bold; display: block;'>정상적인 동작이니 '권한 업데이트'나 '허용', '계속'등을 눌러 진행해주세요.</span>",
    5: "'취소'와 '설정'이 보이지 않고 '확인'만 노출될 경우, 패밀리링크 앱에 의해 설치가 차단된 상황입니다. 학부모님의 휴대폰 앱에서 감독중지를 요청하여 학습생을 감독 대상에서 제외시켜 주세요. 이후 내 파일 앱에서 밀크T 런처 apk 파일을 터치하면 설치 진행 가능합니다.<br><span style='color: #dc3545; font-weight: bold; background-color: #fff3cd; padding: 2px 4px; border-radius: 3px;'>*패밀리링크의 감독 중지 방법은 밀크T에서 안내가 어렵습니다. 만약 감독 중지 진행이 어려우신 경우 구글 측으로 문의해주시기를 부탁드립니다.</span>",
    10: "밀크T 학습을 위한 필수 권한을 허용하는 것으로, 임의로 학습 데이터를 삭제하거나 기기 설정을 변경하는 것은 아닙니다.",
    13: "학습생의 실제 학년에 맞는 서비스를 선택해주세요.(예를 들어, 학습생이 6학년이라면 밀크T 초등 선택)",
    14: "'다음'이 보이지 않을 경우 와이파이 연결이 되지 않았거나 배터리가 30% 미만인 상황입니다. 충전기를 연결하면 배터리 30%가 되지 않더라도 '다음'버튼이 활성화됩니다.",
    16: "인증이 너무 오래 걸리거나 실패했다고 나온다면 와이파이 공유기 재부팅을 부탁드립니다.",
    18: "밀크T 학습을 위한 필수 권한을 허용하는 것으로, 임의로 학습 데이터를 삭제하거나 기기 설정을 변경하는 것는 아닙니다.",
    19: "밀크T와 함께해주셔서 감사합니다. 만약 설치 진행이<br>어려우시거나 정상적으로 설치가 되지 않는 경우에는,<br><span style='color: #dc3545; font-weight: bold; display: block;'>담당 선생님 혹은 밀크T 고객센터로 연락 부탁드립니다.</span>"
  }
};

// 이미지 로딩 상태 표시 함수
function showImageLoadingState(imgElement) {
  // 로딩 중 상태 표시
  imgElement.style.opacity = '0.7';
  imgElement.style.transition = 'opacity 0.3s ease';
  
  // 이미지 로드 완료시 원래 상태로 복원
  imgElement.onload = () => {
    imgElement.style.opacity = '1';
  };
  
  // 이미지 로드 실패시 처리
  imgElement.onerror = () => {
    imgElement.style.opacity = '0.5';
    imgElement.alt = '이미지를 불러올 수 없습니다';
  };
}

// 페이지 로드 시 초기 설정
window.addEventListener('load', function() {
  // URL에서 현재 탭 정보 확인
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  if (tabParam === '1') {
    currentTabIndex = 1;
    showTab(1);
  }
  
  generateScrollImages();
  updateNavigation();
});

function generateScrollImages() {
  for (let tabIndex = 0; tabIndex < 2; tabIndex++) {
    const container = document.getElementById(`scrollImages${tabIndex}`);
    container.innerHTML = '';
    const totalImages = tabImageCounts[tabIndex];
    
    // 안드로이드 버전 확인 탭(첫 번째 탭)에만 버전 안내 메시지 추가
    if (tabIndex === 0) {
      const versionNotice = document.createElement('div');
      versionNotice.className = 'version-notice';
      versionNotice.innerHTML = `
        <div class="notice-icon">!</div>
        <div class="notice-text">밀크T는 안드로이드 10 버전에서만 구동이 가능합니다. 안드로이드 10 버전이 아닐 경우 정상적인 학습이 불가능하여 버전 확인이 필요합니다.</div>
      `;
      container.appendChild(versionNotice);
    }
    
    for (let i = 1; i <= totalImages; i++) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'image-wrapper';
      
      // 단계 설명 텍스트 추가
      const stepText = document.createElement('div');
      stepText.className = 'step-text';
      stepText.innerHTML = stepDescriptions[tabIndex][i - 1] || `단계 ${i} 설명`;
      
      const img = document.createElement('img');
      img.src = getImageSrc('s6lite', tabIndex, i);
      img.alt = `단계 ${i}`;
      img.onclick = () => openModal('s6lite', tabIndex, i);
      img.className = 'scroll-image';
      
      // Lazy loading 속성 추가 (최신 브라우저 지원)
      img.loading = 'lazy';
      
      // 이미지 로딩 상태 표시
      showImageLoadingState(img);
      
      imageWrapper.appendChild(stepText);
      imageWrapper.appendChild(img);
      
      // 추가 설명이 있는 경우 이미지 아래에 추가
      if (additionalNotes[tabIndex] && additionalNotes[tabIndex][i - 1]) {
        const additionalNote = document.createElement('div');
        additionalNote.className = 'additional-note';
        additionalNote.innerHTML = additionalNotes[tabIndex][i - 1];
        imageWrapper.appendChild(additionalNote);
      }
      
      container.appendChild(imageWrapper);
    }
  }
}

function showTab(index) {
  currentTabIndex = index; // 현재 탭 인덱스 업데이트
  
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    contents[i].classList.toggle("active", i === index);
  });
  
  // 네비게이션 업데이트
  updateNavigation();
  
  // 페이지 이동 시 즉시 최상단으로 스크롤
  window.scrollTo(0, 0);
}

function updateNavigation() {
  const topNav = document.querySelector('.top-navigation');
  const nextBtn = document.getElementById('nextBtn');
  
  if (currentTabIndex === 0) {
    // 1. 안드로이드 버전 확인 탭 - 오른쪽 정렬, 다음 버튼만
    topNav.classList.remove('left-align');
    nextBtn.textContent = '다음 단계로 →';
    nextBtn.style.display = 'block';
  } else {
    // 2. 런처 설치 탭 - 왼쪽 정렬, 이전 버튼으로 변경
    topNav.classList.add('left-align');
    nextBtn.textContent = '← 이전 단계로';
    nextBtn.style.display = 'block';
  }
}

function handleNextClick() {
  if (currentTabIndex === 0) {
    // 1번 탭에서: 2번 탭으로 이동
    showTab(1);
  } else {
    // 2번 탭에서: 1번 탭으로 이동 (이전 단계로 기능)
    showTab(0);
  }
}

// 모달 관련 변수
let modalDevice = 's6lite';
let modalTabIndex = 0;
let modalSlideIndex = 1;

// 모달 함수들 - 스크롤 위치 저장/복원 기능 개선
function openModal(device, tabIndex, slideIndex) {
  modalDevice = device;
  modalTabIndex = tabIndex;
  modalSlideIndex = slideIndex;
  
  // 현재 스크롤 위치 저장
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  
  // 모달 이미지 설정
  modalImage.src = getImageSrc(device, tabIndex, slideIndex);
  
  // 모달 표시
  modal.style.display = "block";
  
  // body 스크롤 방지 강화
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
  
  // body 스크롤 복원
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  
  // 현재 모달에서 보고 있던 이미지에 맞는 스크롤 위치 계산
  const container = document.getElementById(`scrollImages${modalTabIndex}`);
  const imageWrappers = container.querySelectorAll('.image-wrapper');
  
  if (imageWrappers[modalSlideIndex - 1]) {
    const targetImageWrapper = imageWrappers[modalSlideIndex - 1];
    const rect = targetImageWrapper.getBoundingClientRect();
    const absoluteTop = rect.top + window.pageYOffset;
    
    // 헤더 높이(97px)를 고려하여 정확한 위치 계산
    const headerHeight = 97;
    const targetScrollPosition = Math.max(0, absoluteTop - headerHeight - 20);
    
    // 즉시 해당 위치로 이동 (애니메이션 없음)
    window.scrollTo(0, targetScrollPosition);
  } else {
    // 기본 스크롤 위치로 복원
    window.scrollTo(0, scrollPosition);
  }
}

function navigateModal(direction) {
  const maxSlides = tabImageCounts[modalTabIndex];
  modalSlideIndex += direction;
  
  // 모달에서도 순환 기능 적용
  if (modalSlideIndex < 1) {
    modalSlideIndex = maxSlides;
  }
  if (modalSlideIndex > maxSlides) {
    modalSlideIndex = 1;
  }
  
  const modalImage = document.getElementById("modalImage");
  modalImage.src = getImageSrc(modalDevice, modalTabIndex, modalSlideIndex);
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// 모달 배경 클릭 시 닫기
document.getElementById("imageModal").addEventListener('click', function(event) {
  if (event.target === this) {
    closeModal();
  }
});

function getImageSrc(device, tabIndex, slideIndex) {
  if (device === 's6lite' && tabIndex === 0) {
    // S6 Lite 안드로이드 버전 확인 (5장)
    if (slideIndex === 1) {
      // 1번 이미지는 s6 레포 사용 (런처 설치 탭과 동일하게 통일)
      return 'https://raw.githubusercontent.com/skyhigh79/s6/main/s6_launcher_install_01.png';
    } else if (slideIndex === 3) {
      // 3번 이미지는 adimage 레포 사용
      return 'https://raw.githubusercontent.com/skyhigh79/adimage/main/s6_android_check_03.png';
    } else if (slideIndex === 4) {
      // 4번 이미지는 ad 레포 사용 (기존 유지)
      return 'https://raw.githubusercontent.com/skyhigh79/ad/main/s6_android_check_04.png';
    } else {
      // 나머지는 기존 s6os 레포 이미지 사용
      const paddedIndex = slideIndex.toString().padStart(2, '0');
      return `https://raw.githubusercontent.com/skyhigh79/s6os/main/s6_android_check_${paddedIndex}.png`;
    }
  } else if (device === 's6lite' && tabIndex === 1) {
    // S6 Lite 런처 설치 (20장) - 새로운 s6 레포 사용
    const paddedIndex = slideIndex.toString().padStart(2, '0');
    return `https://raw.githubusercontent.com/skyhigh79/s6/main/s6_launcher_install_${paddedIndex}.png`;
  }
  
  // 기본값 (테스트용 이미지)
  return `https://raw.githubusercontent.com/skyhigh79/aa/main/ex.png`;
}

// 맨 위로 버튼 기능
const scrollToTopBtn = document.getElementById('scrollToTop');

// 스크롤 이벤트 리스너
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

// 맨 위로 스크롤 함수
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
>>>>>>> ce8823eb1aba76f983f552e18b382abdd152c87d
>>>>>>> 483e8678b3f93284765122514296df9d14efa6f6
