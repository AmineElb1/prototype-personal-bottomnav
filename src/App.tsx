import { useState, useRef, useEffect, useCallback, type ReactNode } from "react"
import Navigation20MobileAppIos from "./imports/Navigation20MobileAppIos/index"
import SiteNav from "./SiteNav"
import BottomNav, { loadNavPrefs, NAV_ITEMS } from "./BottomNav"

// ─── SF Symbols as inline SVG (cross-platform, exact Figma geometry) ──────────

const ICON_VOETBAL = (
  <svg viewBox="0 0 16.9336 16.9336" fill="none" width="17" height="17">
    <path fill="currentColor" d="M8.4668 5.13818L11.7041 7.62842L10.4092 11.6128H6.52441L5.22949 7.62842L8.4668 5.13818ZM11.3804 1.32812L8.4585 3.68555L5.52832 1.32812L8.4585 0.373535L11.3804 1.32812ZM8.01025 0.655762H8.93164V6.15088H8.01025V0.655762ZM14.2607 3.41992L15.8462 5.40381L16.4438 8.84863L13.1733 7.01416L14.2607 3.41992ZM16.1533 6.30029L11.0566 8.36719L10.708 7.51221L15.8047 5.45361L16.1533 6.30029ZM10.376 16.0454L11.2227 12.3848L15.041 12.4429L13.1484 14.8418L10.376 16.0454ZM13.4473 14.5015L12.7168 15.0576L9.33008 10.7246L10.0688 10.1602L13.4473 14.5015ZM6.54932 16.0122L3.77686 14.8086L1.88428 12.4097L5.70264 12.3516L6.54932 16.0122ZM3.47803 14.4683L6.85645 10.127L7.59521 10.6914L4.2085 15.0244L3.47803 14.4683ZM2.67285 3.41992L3.76025 7.01416L0.489746 8.84863L1.0874 5.40381L2.67285 3.41992ZM0.780273 6.30029L1.12891 5.45361L6.22559 7.51221L5.87695 8.36719L0.780273 6.30029ZM8.4668 16.9336C7.29915 16.9336 6.20345 16.7122 5.17969 16.2695C4.15592 15.8324 3.25667 15.2264 2.48193 14.4517C1.70719 13.6769 1.09847 12.7777 0.655762 11.7539C0.218587 10.7301 0 9.63444 0 8.4668C0 7.29915 0.218587 6.20345 0.655762 5.17969C1.09847 4.15592 1.70719 3.25667 2.48193 2.48193C3.25667 1.70166 4.15592 1.09294 5.17969 0.655762C6.20345 0.218587 7.29915 0 8.4668 0C9.63444 0 10.7301 0.218587 11.7539 0.655762C12.7777 1.09294 13.6769 1.70166 14.4517 2.48193C15.2264 3.25667 15.8324 4.15592 16.2695 5.17969C16.7122 6.20345 16.9336 7.29915 16.9336 8.4668C16.9336 9.63444 16.7122 10.7301 16.2695 11.7539C15.8324 12.7777 15.2264 13.6769 14.4517 14.4517C13.6769 15.2264 12.7777 15.8324 11.7539 16.2695C10.7301 16.7122 9.63444 16.9336 8.4668 16.9336ZM8.4668 15.8047C9.47949 15.8047 10.4285 15.6138 11.314 15.2319C12.1994 14.8501 12.9797 14.3244 13.6548 13.6548C14.3299 12.9797 14.8556 12.1994 15.2319 11.314C15.6138 10.4285 15.8047 9.47949 15.8047 8.4668C15.8047 7.4541 15.6138 6.50505 15.2319 5.61963C14.8556 4.72868 14.3299 3.9484 13.6548 3.27881C12.9797 2.60368 12.1994 2.07796 11.314 1.70166C10.4285 1.31982 9.47949 1.12891 8.4668 1.12891C7.4541 1.12891 6.50505 1.31982 5.61963 1.70166C4.73421 2.07796 3.95394 2.60368 3.27881 3.27881C2.60368 3.9484 2.0752 4.72868 1.69336 5.61963C1.31706 6.50505 1.12891 7.4541 1.12891 8.4668C1.12891 9.47949 1.31706 10.4285 1.69336 11.314C2.0752 12.1994 2.60368 12.9797 3.27881 13.6548C3.95394 14.3244 4.73421 14.8501 5.61963 15.2319C6.50505 15.6138 7.4541 15.8047 8.4668 15.8047Z"/>
  </svg>
)

const ICON_TENNIS = (
  <svg viewBox="0 0 17.8301 17.8215" fill="none" width="18" height="18">
    <path fill="currentColor" d="M16.4771 1.3693C16.9862 1.87288 17.3514 2.45671 17.5728 3.12077C17.7996 3.78483 17.8854 4.47933 17.8301 5.20426C17.7747 5.9292 17.5838 6.64583 17.2573 7.35417C16.9308 8.05697 16.4715 8.70443 15.8794 9.29655C15.1877 9.98828 14.4323 10.4836 13.6133 10.7824C12.7943 11.0757 11.9559 11.2362 11.0981 11.2638C10.4728 11.286 9.90283 11.3275 9.38818 11.3883C8.87354 11.4437 8.37826 11.5544 7.90234 11.7204C7.43197 11.8864 6.95329 12.1382 6.46631 12.4757C5.97933 12.8078 5.44808 13.2588 4.87256 13.8288L4.00928 12.9738C4.5848 12.3983 5.04134 11.867 5.37891 11.38C5.72201 10.8875 5.97656 10.4033 6.14258 9.92741C6.31413 9.4515 6.42757 8.95622 6.48291 8.44157C6.53825 7.92139 6.57145 7.3514 6.58252 6.73161C6.59359 5.89046 6.7513 5.05762 7.05566 4.23307C7.36003 3.40299 7.85531 2.64486 8.5415 1.95866C9.13363 1.36654 9.78109 0.909994 10.4839 0.58903C11.1922 0.262533 11.9089 0.0716146 12.6338 0.016276C13.3587 -0.0390625 14.0532 0.0467122 14.7173 0.2736C15.3813 0.494954 15.9679 0.860189 16.4771 1.3693ZM15.5889 2.24919C15.0465 1.70687 14.424 1.36654 13.7212 1.22819C13.0239 1.08984 12.3045 1.15625 11.563 1.42741C10.8215 1.69857 10.1104 2.17171 9.42969 2.84684C8.74902 3.52751 8.27311 4.24137 8.00195 4.98844C7.73079 5.73551 7.66439 6.45768 7.80273 7.15495C7.94108 7.85221 8.28418 8.47201 8.83203 9.01432C9.37435 9.55664 9.99414 9.89697 10.6914 10.0353C11.3887 10.1737 12.1081 10.1073 12.8496 9.8361C13.5967 9.56494 14.3133 9.08903 14.9995 8.40837C15.6802 7.73324 16.1533 7.0249 16.4189 6.28337C16.6901 5.54183 16.7537 4.82243 16.6099 4.12516C16.4715 3.42236 16.1312 2.79704 15.5889 2.24919ZM7.94385 9.90251C7.8221 9.78076 7.70589 9.65348 7.59521 9.52067C7.49007 9.38786 7.39323 9.24675 7.30469 9.09733C7.23828 9.50684 7.13037 9.90804 6.98096 10.3009C6.83708 10.6883 6.62679 11.0868 6.3501 11.4963C6.7596 11.2251 7.15804 11.0148 7.54541 10.8654C7.93831 10.716 8.33952 10.6053 8.74902 10.5334C8.60514 10.4448 8.46403 10.3507 8.32568 10.2511C8.18734 10.146 8.06006 10.0298 7.94385 9.90251ZM0.290527 16.9831C0.0968425 16.7894 0 16.5653 0 16.3107C0 16.0617 0.0968425 15.8431 0.290527 15.6549L3.50293 12.4259C3.69661 12.2378 3.91797 12.1437 4.16699 12.1437C4.42155 12.1437 4.64567 12.2378 4.83936 12.4259L5.38721 12.9821C5.58089 13.1702 5.67773 13.3916 5.67773 13.6462C5.67773 13.9007 5.58089 14.1248 5.38721 14.3185L2.1748 17.5392C1.98112 17.7274 1.757 17.8215 1.50244 17.8215C1.25342 17.8215 1.03206 17.7274 0.838379 17.5392L0.290527 16.9831ZM7.22998 6.632L13.2148 0.638835L13.6299 1.06217L7.64502 7.04704L7.22998 6.632ZM7.69482 8.54118L15.1323 1.11198L15.5308 1.53532L8.10156 8.95622L7.69482 8.54118ZM8.88184 9.73649L16.3193 2.29899L16.7344 2.72233L9.30518 10.1515L8.88184 9.73649ZM10.7993 10.2013L16.7759 4.21647L17.1992 4.63151L11.2061 10.6247L10.7993 10.2013ZM12.6006 0.871257L13.0156 0.456217L17.332 4.76432L16.917 5.17936L12.6006 0.871257ZM10.7246 1.26139L11.1396 0.846354L17 6.6984L16.5684 7.12174L10.7246 1.26139ZM9.5127 2.29069L9.92773 1.86735L15.9624 7.90202L15.5308 8.32536L9.5127 2.29069ZM8.4585 3.34489L8.87354 2.92155L14.8999 8.95622L14.4766 9.37956L8.4585 3.34489ZM7.4292 4.5568L7.83594 4.15006L13.6963 10.0021L13.2812 10.4172L7.4292 4.5568ZM7.02246 6.41618L7.4375 6.00114L11.7871 10.3424L11.3638 10.7658L7.02246 6.41618Z"/>
  </svg>
)

const ICON_WIELRENNEN = (
  <svg viewBox="0 0 21.0259 15.9458" fill="none" width="21" height="16">
    <path fill="currentColor" d="M10.5171 12.6753C10.2847 12.6753 10.0882 12.5951 9.92773 12.4346C9.76725 12.2686 9.68701 12.0721 9.68701 11.8452V8.01855L6.64062 4.95557C6.3418 4.65674 6.15088 4.30257 6.06787 3.89307C5.98486 3.47803 6.0236 3.07406 6.18408 2.68115C6.3501 2.29378 6.60465 1.98389 6.94775 1.75146C7.29639 1.51351 7.68376 1.39453 8.10986 1.39453H12.1855C12.6504 1.39453 13.0433 1.55778 13.3643 1.88428C13.6908 2.20524 13.854 2.59814 13.854 3.06299V6.00146H16.3691C16.596 6.00146 16.7897 6.08171 16.9502 6.24219C17.1107 6.40267 17.1909 6.59912 17.1909 6.83154C17.1909 7.05843 17.1107 7.25212 16.9502 7.4126C16.7897 7.57308 16.596 7.65332 16.3691 7.65332H13.0239C12.797 7.65332 12.6006 7.57308 12.4346 7.4126C12.2741 7.25212 12.1938 7.05843 12.1938 6.83154V4.76465C12.1938 4.65397 12.1634 4.5516 12.1025 4.45752C12.0417 4.35791 11.931 4.30811 11.7705 4.30811H9.10596C9.00081 4.30811 8.92887 4.35238 8.89014 4.44092C8.85693 4.52393 8.87354 4.60417 8.93994 4.68164L11.1147 7.10547C11.2697 7.27702 11.3472 7.46517 11.3472 7.66992V11.8452C11.3472 12.0721 11.2642 12.2686 11.0981 12.4346C10.9377 12.5951 10.744 12.6753 10.5171 12.6753ZM4.50732 15.9458C3.882 15.9458 3.29541 15.8296 2.74756 15.5972C2.20524 15.3647 1.72656 15.041 1.31152 14.626C0.902018 14.2109 0.581055 13.7323 0.348633 13.1899C0.116211 12.6421 0 12.0555 0 11.4302C0 10.8049 0.116211 10.221 0.348633 9.67871C0.581055 9.13086 0.902018 8.64941 1.31152 8.23438C1.72656 7.81934 2.20524 7.49561 2.74756 7.26318C3.29541 7.03076 3.882 6.91455 4.50732 6.91455C5.13818 6.91455 5.72477 7.03076 6.26709 7.26318C6.81494 7.49561 7.29362 7.81934 7.70312 8.23438C8.11816 8.64941 8.44189 9.13086 8.67432 9.67871C8.90674 10.221 9.02295 10.8049 9.02295 11.4302C9.02295 12.0555 8.90674 12.6421 8.67432 13.1899C8.44189 13.7323 8.11816 14.2109 7.70312 14.626C7.29362 15.041 6.81494 15.3647 6.26709 15.5972C5.72477 15.8296 5.13818 15.9458 4.50732 15.9458ZM4.50732 14.7754C5.12158 14.7754 5.6805 14.6232 6.18408 14.3188C6.6932 14.02 7.09717 13.6188 7.396 13.1152C7.70036 12.6061 7.85254 12.0444 7.85254 11.4302C7.85254 10.8159 7.70036 10.257 7.396 9.75342C7.09717 9.2443 6.6932 8.84033 6.18408 8.5415C5.6805 8.23714 5.12158 8.08496 4.50732 8.08496C3.8986 8.08496 3.33968 8.23714 2.83057 8.5415C2.32699 8.84033 1.92301 9.2443 1.61865 9.75342C1.31982 10.257 1.17041 10.8159 1.17041 11.4302C1.17041 12.0444 1.31982 12.6061 1.61865 13.1152C1.92301 13.6188 2.32699 14.02 2.83057 14.3188C3.33968 14.6232 3.8986 14.7754 4.50732 14.7754ZM18.7432 8.94824C18.5661 8.79329 18.4748 8.63558 18.4692 8.4751C18.4692 8.30908 18.519 8.17074 18.6187 8.06006C18.7238 7.94938 18.8538 7.88574 19.0088 7.86914C19.1693 7.84701 19.327 7.90234 19.4819 8.03516C19.9578 8.45573 20.3341 8.95654 20.6108 9.5376C20.8875 10.1187 21.0259 10.7495 21.0259 11.4302C21.0259 12.0555 20.9097 12.6421 20.6772 13.1899C20.4448 13.7323 20.1211 14.2109 19.7061 14.626C19.2965 15.041 18.8179 15.3647 18.27 15.5972C17.7277 15.8296 17.1439 15.9458 16.5186 15.9458C15.8932 15.9458 15.3066 15.8296 14.7588 15.5972C14.2109 15.3647 13.7295 15.041 13.3145 14.626C12.9049 14.2109 12.584 13.7323 12.3516 13.1899C12.1191 12.6421 12.0029 12.0555 12.0029 11.4302C12.0029 11.1037 12.0361 10.7882 12.1025 10.4839C12.1745 10.174 12.2741 9.87516 12.4014 9.5874C12.4788 9.41032 12.5868 9.29688 12.7251 9.24707C12.869 9.19173 13.0101 9.19173 13.1484 9.24707C13.2923 9.29688 13.4002 9.39648 13.4722 9.5459C13.5441 9.69531 13.533 9.88346 13.439 10.1104C13.2619 10.5254 13.1733 10.9653 13.1733 11.4302C13.1733 12.0444 13.3228 12.6061 13.6216 13.1152C13.9259 13.6188 14.3299 14.02 14.8335 14.3188C15.3426 14.6232 15.9043 14.7754 16.5186 14.7754C17.1328 14.7754 17.6917 14.6232 18.1953 14.3188C18.6989 14.02 19.1001 13.6188 19.3989 13.1152C19.7033 12.6061 19.8555 12.0444 19.8555 11.4302C19.8555 10.9377 19.7531 10.4784 19.5483 10.0522C19.3491 9.62061 19.0807 9.2526 18.7432 8.94824ZM16.5186 3.62744C16.181 3.62744 15.8739 3.5472 15.5972 3.38672C15.3205 3.2207 15.0991 3.00212 14.9331 2.73096C14.7726 2.45426 14.6924 2.14714 14.6924 1.80957C14.6924 1.47754 14.7726 1.17594 14.9331 0.904785C15.0991 0.628092 15.3205 0.409505 15.5972 0.249023C15.8739 0.0830078 16.181 0 16.5186 0C16.8506 0 17.1522 0.0830078 17.4233 0.249023C17.6945 0.409505 17.9103 0.628092 18.0708 0.904785C18.2368 1.17594 18.3198 1.47754 18.3198 1.80957C18.3198 2.14714 18.2368 2.45426 18.0708 2.73096C17.9103 3.00212 17.6945 3.2207 17.4233 3.38672C17.1522 3.5472 16.8506 3.62744 16.5186 3.62744Z"/>
  </svg>
)

const ICON_HOCKEY = (
  <svg viewBox="0 0 17.0664 13.0488" fill="none" width="18" height="14">
    <path fill="currentColor" d="M8.5249 13.0488C7.32406 13.0488 6.20622 12.9243 5.17139 12.6753C4.13656 12.4263 3.23177 12.0804 2.45703 11.6377C1.68229 11.195 1.0791 10.6831 0.647461 10.1021C0.21582 9.521 0 8.9012 0 8.24268V3.88477L1.32812 5.04688V8.24268C1.32812 8.8846 1.61865 9.46842 2.19971 9.99414C2.7863 10.5143 3.61637 10.9321 4.68994 11.2476C5.76904 11.5575 7.04736 11.7124 8.5249 11.7124C10.0024 11.7124 11.2808 11.5575 12.3599 11.2476C13.439 10.9321 14.269 10.5143 14.8501 9.99414C15.4367 9.46842 15.73 8.8846 15.73 8.24268V5.04688L17.0664 3.88477V8.24268C17.0664 8.9012 16.8478 9.521 16.4106 10.1021C15.979 10.6831 15.3758 11.195 14.6011 11.6377C13.8263 12.0804 12.9215 12.4263 11.8867 12.6753C10.8519 12.9243 9.73128 13.0488 8.5249 13.0488ZM8.5249 7.73633C7.32959 7.73633 6.21452 7.63672 5.17969 7.4375C4.15039 7.23828 3.24561 6.95882 2.46533 6.59912C1.69059 6.23942 1.08464 5.82438 0.647461 5.354C0.21582 4.87809 0 4.36344 0 3.81006C0 3.27881 0.21582 2.78353 0.647461 2.32422C1.08464 1.85938 1.69059 1.4554 2.46533 1.1123C3.24561 0.763672 4.15039 0.492513 5.17969 0.298828C6.21452 0.0996094 7.32959 0 8.5249 0C9.72021 0 10.8353 0.0996094 11.8701 0.298828C12.9049 0.492513 13.8097 0.763672 14.5845 1.1123C15.3647 1.4554 15.9735 1.85938 16.4106 2.32422C16.8478 2.78353 17.0664 3.27881 17.0664 3.81006C17.0664 4.36344 16.8478 4.87809 16.4106 5.354C15.9735 5.82438 15.3647 6.23942 14.5845 6.59912C13.8097 6.95882 12.9049 7.23828 11.8701 7.4375C10.8353 7.63672 9.72021 7.73633 8.5249 7.73633ZM8.5249 6.3999C9.5376 6.3999 10.4811 6.3335 11.3555 6.20068C12.2298 6.06787 12.9935 5.88525 13.6465 5.65283C14.305 5.41488 14.8169 5.14095 15.1821 4.83105C15.5474 4.51562 15.73 4.17529 15.73 3.81006C15.73 3.46143 15.5474 3.1377 15.1821 2.83887C14.8169 2.54004 14.305 2.27718 13.6465 2.05029C12.9935 1.8234 12.2298 1.64909 11.3555 1.52734C10.4811 1.40007 9.5376 1.33643 8.5249 1.33643C7.51221 1.33643 6.56868 1.40007 5.69434 1.52734C4.82552 1.64909 4.06185 1.8234 3.40332 2.05029C2.75033 2.27718 2.24121 2.54004 1.87598 2.83887C1.51074 3.1377 1.32812 3.46143 1.32812 3.81006C1.32812 4.17529 1.51074 4.51562 1.87598 4.83105C2.24121 5.14095 2.75033 5.41488 3.40332 5.65283C4.06185 5.88525 4.82552 6.06787 5.69434 6.20068C6.56868 6.3335 7.51221 6.3999 8.5249 6.3999Z"/>
  </svg>
)

const ICON_ZWEMMEN = (
  <svg viewBox="0 0 19 14" fill="none" width="19" height="14">
    <circle cx="14.5" cy="2.5" r="1.5" fill="currentColor"/>
    <path d="M11 4.5L14 2L17 5.5L13 9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 9.5C2.5 8.5 4 8 5.5 8.5L9 10L13 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M1 12C3 11 5 11.5 7 12.5C9 13.5 11 13.5 13 12.5C15 11.5 17 11 19 12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
)

const ICON_ATLETIEK = (
  <svg viewBox="0 0 14 19" fill="none" width="14" height="19">
    <circle cx="7" cy="2" r="1.7" fill="currentColor"/>
    <path d="M7 4.5L5 9H9.5L11 13" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 9L3 13.5" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round"/>
    <path d="M9.5 9L10.5 12L8.5 15L7 18" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 13.5L1 17" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round"/>
  </svg>
)

// ─── Types ───────────────────────────────────────────────────────────────────

interface SubmenuItem { id: string; label: string }

interface PillConfig {
  id: string
  label: string
  icon?: ReactNode
  chevron?: boolean
  submenu?: SubmenuItem[]
}

interface TabConfig {
  id: string
  label: string
  pills: PillConfig[]
}

interface Article {
  label: string
  title: string
  image?: string
  excerpt: string
  timeAgo: string
  premium?: boolean
}

// ─── Navigation data ─────────────────────────────────────────────────────────

const MAIN_TABS: TabConfig[] = [
  { id: "net-binnen", label: "Net binnen", pills: [] },
  { id: "mijn-gemeente", label: "Mijn gemeente", pills: [] },
  { id: "sport", label: "Sport", pills: [] },
  { id: "showbizz", label: "Showbizz", pills: [] },
]

// ─── Content ─────────────────────────────────────────────────────────────────

const CONTENT: Record<string, Article[]> = {
  "net-binnen": [
    { label: "Economie", title: "Inflatie daalt verder naar 2,3 procent — laagste niveau in drie jaar", image: "photo-1620202304714-23f7b437d856", excerpt: "De prijzen in de eurozone stijgen minder snel dan verwacht. Economen wijzen op dalende energieprijzen en een zwakkere binnenlandse vraag.", timeAgo: "12 min geleden", premium: true },
    { label: "Klimaat", title: "Uitstoot daalt te traag: land dreigt klimaatdoelen voor 2030 te missen", image: "photo-1557436552-d1d884f1bb62", excerpt: "Uit een nieuw rapport blijkt dat de uitstoot van broeikasgassen onvoldoende daalt, vooral in verkeer en gebouwen.", timeAgo: "1 uur geleden" },
    { label: "Buitenland", title: "Zelensky: offensief gaat door ondanks zware verliezen aan het front", image: "photo-1558352983-6b862ad859a1", excerpt: "De Oekraïense president hield een toespraak in Kyiv en benadrukte dat steun van het Westen cruciaal blijft.", timeAgo: "2 uur geleden" },
    { label: "Wetenschap", title: "Onderzoekers ontdekken mechanisme achter veroudering van hersencellen", image: "photo-1719650592946-55163c4994cb", excerpt: "Een nieuwe studie toont aan dat mitochondriaal disfunctioneren een sleutelrol speelt bij het verouderingsproces.", timeAgo: "3 uur geleden", premium: true },
    { label: "Politiek", title: "Regeerakkoord rond: lagere belasting voor middeninkomens centraal", image: "photo-1586174035695-35ab9e19215c", excerpt: "De coalitiepartijen presenteerden vandaag een akkoord met plannen ter waarde van 28 miljard euro.", timeAgo: "4 uur geleden" },
  ],
  "mijn-gemeente": [
    { label: "Verkeer", title: "Fietsstraat in het centrum gaat definitief open na maanden van werken", image: "photo-1627964718300-fab24a8a85ce", excerpt: "De nieuwe fietsstraat verbindt het station met de markt. Auto's zijn er nog slechts te gast, met een maximumsnelheid van 30 kilometer per uur.", timeAgo: "25 min geleden" },
    { label: "Wonen", title: "Gemeente trekt 12 miljoen uit voor betaalbare woningen rond het station", image: "photo-1652294094412-7748207413fd", excerpt: "Het gemeentebestuur wil tegen 2028 tweehonderd nieuwe woningen bouwen, waarvan een derde sociaal.", timeAgo: "1 uur geleden", premium: true },
    { label: "Lokaal", title: "Zwembad blijft deze zomer langer open dankzij extra budget", image: "photo-1765401809244-888bddb45307", excerpt: "Na klachten van inwoners besliste de gemeenteraad om het openluchtbad tot half september open te houden.", timeAgo: "3 uur geleden" },
    { label: "Cultuur", title: "Buurtfeest op het kerkplein trekt duizenden bezoekers", image: "photo-1459679749680-18eb1eb37418", excerpt: "Van foodtrucks tot een optreden van de lokale harmonie: het jaarlijkse feest was opnieuw een succes.", timeAgo: "Gisteren" },
    { label: "Gemeenteraad", title: "Raad stemt in met nieuwe parkeerzones: bewoners betalen minder", image: "photo-1536181783029-1097aaf179de", excerpt: "Met 19 tegen 8 stemmen keurde de gemeenteraad het nieuwe parkeerplan goed. Het gaat in vanaf januari.", timeAgo: "Gisteren" },
  ],
  sport: [
    { label: "Voetbal", title: "Topper eindigt in spektakel: 3-2 na rode kaart voor de doelman", image: "photo-1679391029864-d46f366a456b", excerpt: "In de 82e minuut greep de doelman buiten zijn zestien in. De thuisploeg profiteerde van het overwicht en won na een bizarre slotfase.", timeAgo: "35 min geleden" },
    { label: "Tennis", title: "Zesde grandslamtitel voor Swiatek na winst in twee sets", image: "photo-1761927055615-f59ae714385b", excerpt: "In de finale won ze met 6-3 en 6-4. \"Ik ben trots op mijn vechtlust\", zei ze na afloop.", timeAgo: "1 uur geleden" },
    { label: "Wielrennen", title: "Vingegaard pakt historische derde eindzege in de Tour", image: "photo-1755198795482-f8409cec16cd", excerpt: "In de tijdrit soleerde de Deen naar de eindzege. Pogacar moest genoegen nemen met zilver.", timeAgo: "2 uur geleden", premium: true },
    { label: "Hockey", title: "Hockeydames pakken goud op het WK na shoot-out tegen België", image: "photo-1734159319354-b9ead78dd441", excerpt: "Na 1-1 in de finale werd het in de shoot-out 3-2. \"Een sprookje\", zei de aanvoerder.", timeAgo: "3 uur geleden" },
    { label: "Atletiek", title: "Nationaal record op de 100 meter: 10,81 seconden in Amsterdam", image: "photo-1502904550040-7534597429ae", excerpt: "Ze verbrak haar eigen record uit 2015. \"Ik had nooit verwacht dit nog te doen.\"", timeAgo: "4 uur geleden" },
  ],
  showbizz: [
    { label: "Film", title: "Debuutfilm 'De Stille Kracht' wint de Gouden Beer in Rotterdam", image: "photo-1771574203200-0ec88f162fe0", excerpt: "Regisseur Mila de Vries sleepte met haar eerste langspeelfilm de hoofdprijs in de wacht. \"Dit is voor iedereen die twijfelde.\"", timeAgo: "20 min geleden" },
    { label: "Muziek", title: "Zangeres kondigt verrassingstournee aan: tickets binnen een uur uitverkocht", image: "photo-1693517343607-e7dced201648", excerpt: "Voor de zomer staan er twaalf concerten gepland. Fans klaagden over problemen met de ticketsite.", timeAgo: "1 uur geleden" },
    { label: "Televisie", title: "Nieuw seizoen van populair kookprogramma start met recordkijkcijfers", image: "photo-1556056504-5c7696c4c28d", excerpt: "Ruim 1,2 miljoen kijkers zagen de eerste aflevering, het beste resultaat in vijf jaar.", timeAgo: "2 uur geleden", premium: true },
    { label: "Royalty", title: "Prinses opent expositie en verrast met onaangekondigd bezoek aan kinderziekenhuis", image: "photo-1594810205183-18a8b0ce6c13", excerpt: "Na de opening bracht ze een uur door bij jonge patiënten. \"Dat was niet gepland, maar wel gewenst.\"", timeAgo: "4 uur geleden" },
    { label: "Celebrity", title: "Bekende presentator en partner verwachten tweede kindje", image: "photo-1572578906052-f7f3edbecc68", excerpt: "Het stel maakte het nieuws zelf bekend via sociale media en kreeg duizenden felicitaties.", timeAgo: "Gisteren" },
  ],
  "sport/alles": [
    { label: "Voetbal", title: "Ajax wint spectaculaire topper van PSV met 3-2 na rode kaart keeper", image: "photo-1679391029864-d46f366a456b", excerpt: "In de 82e minuut greep de PSV-doelman in na een uitbraak van Brobbey. Ajax profiteerde van het numerieke overwicht.", timeAgo: "35 min geleden" },
    { label: "Tennis", title: "Swiatek wint Australian Open: zesde Grand Slam-titel voor de Poolse", image: "photo-1761927055615-f59ae714385b", excerpt: "In de finale versloeg ze Gauff in twee sets: 6-3 en 6-4. 'Ik ben trots op mijn vechtlust', aldus Swiatek.", timeAgo: "1 uur geleden" },
    { label: "Wielrennen", title: "Vingegaard pakt eindwinst in de Tour: historisch derde overwinning", image: "photo-1755198795482-f8409cec16cd", excerpt: "In de tijdrit naar Dijon soleerde de Deen naar de definitieve eindzege. Pogacar moest genoegen nemen met zilver.", timeAgo: "2 uur geleden", premium: true },
    { label: "Hockey", title: "Hockeydames pakken goud op WK na dramatische shoot-out tegen België", image: "photo-1734159319354-b9ead78dd441", excerpt: "Na 1-1 in de finale werd het in de shoot-out 3-2 voor Oranje. 'Een sprookje', zei aanvoerder Dicke.", timeAgo: "3 uur geleden" },
    { label: "Atletiek", title: "Dafne Schippers verbetert Nederlands record op 100m in Amsterdam", image: "photo-1502904550040-7534597429ae", excerpt: "Met een tijd van 10,81 seconden verbrak ze haar eigen record uit 2015. 'Ik had nooit verwacht dit ooit nog te doen.'", timeAgo: "4 uur geleden" },
    { label: "Zwemmen", title: "Kira Toussaint pakt zilver op 100m rugslag bij WK kortebaan", image: "photo-1530549387789-4c1017266635", excerpt: "De Française Bonnet was nipt te snel, maar Toussaint verbeterde wel het Nederlands record.", timeAgo: "5 uur geleden" },
  ],
  "sport/voetbal": [
    { label: "Eredivisie", title: "Ajax wint spectaculaire topper van PSV met 3-2 na rode kaart keeper", image: "photo-1679391029864-d46f366a456b", excerpt: "In de 82e minuut greep de PSV-doelman in na een uitbraak van Brobbey. Ajax profiteerde van het numerieke overwicht.", timeAgo: "35 min geleden" },
    { label: "Eredivisie", title: "Feyenoord pakt koploperplaats na zege op AZ", image: "photo-1556816214-fda351e4a7fb", excerpt: "Trainer Slot reageerde na afloop tevreden. 'Dit is wat we de hele zomer hebben geoefend.'", timeAgo: "2 uur geleden", premium: true },
    { label: "Champions League", title: "PSV overleeft spannende avond in Milaan: gelijkspel via Veerman", image: "photo-1693517343607-e7dced201648", excerpt: "De Eindhovenaren kwamen twee keer achter maar wisten via Veerman en Tillman toch een punt te pakken.", timeAgo: "Gisteren" },
    { label: "Transfer", title: "Memphis Depay tekent bij Atletico Madrid voor twee seizoenen", image: "photo-1612694882907-80f21c0e2bb7", excerpt: "De voormalig Oranje-international kiest bewust voor de Spaanse hoofdstad na zijn avontuur in Brazilië.", timeAgo: "Gisteren" },
  ],
  "sport/voetbal/eredivisie": [
    { label: "Eredivisie", title: "Programma speelronde 18: Ajax ontvangt Feyenoord in De Klassiker", image: "photo-1522778526097-ce0a22ceb253", excerpt: "De topper staat zondag om 14:30 in de Johan Cruijff Arena.", timeAgo: "1 uur geleden" },
    { label: "Eredivisie", title: "NEC Nijmegen verslaat Utrecht met 2-0 en klimt naar plek vijf", image: "photo-1574629810360-7efbbe195018", excerpt: "Doelpunten van Van Rooij en Odenthal bezorgden de Nijmegenaren een verdiende overwinning.", timeAgo: "3 uur geleden" },
  ],
  "sport/voetbal/champions-league": [
    { label: "Champions League", title: "Real Madrid en City botsen in historische achtste finale", image: "photo-1517927033932-b3d18e61fb3a", excerpt: "Voor de derde keer in vier jaar treffen de twee grootmachten elkaar in de knock-outfase.", timeAgo: "2 uur geleden", premium: true },
    { label: "Champions League", title: "PSV loot Ajax in de play-offronde: primeur voor Nederland", image: "photo-1556056504-5c7696c4c28d", excerpt: "Een volledig Nederlandse kraker in de voorronde van de Champions League.", timeAgo: "4 uur geleden" },
  ],
  "sport/voetbal/premier-league": [
    { label: "Premier League", title: "Liverpool leidt met 8 punten na 20 speelrondes — op weg naar de titel", image: "photo-1731931594172-2e96a6a9acbf", excerpt: "De Reds wonnen ook hun dertiende competitiewedstrijd dit seizoen.", timeAgo: "1 uur geleden" },
    { label: "Premier League", title: "Ten Hag ontslagen bij Manchester United: Ruud van Nistelrooij neemt over", image: "photo-1623607915241-a3151d59a9c8", excerpt: "Na een reeks teleurstellende resultaten besloot de directie in te grijpen.", timeAgo: "Gisteren", premium: true },
  ],
  "sport/voetbal/knvb-beker": [
    { label: "KNVB Beker", title: "Loting kwartfinale Beker: PSV thuis tegen Go Ahead Eagles", image: "photo-1587329310686-91414b8e3cb7", excerpt: "Ajax speelt uit bij sc Heerenveen. De kwartfinales worden gespeeld op 5 en 6 maart.", timeAgo: "3 uur geleden" },
    { label: "KNVB Beker", title: "NEC elimineert Feyenoord na shoot-out: 4-2 na 1-1", image: "photo-1494177310973-4841f7d5a882", excerpt: "Na penalty's triomfeerden de Nijmegenaren.", timeAgo: "Gisteren" },
  ],
  "sport/tennis": [
    { label: "WTA", title: "Swiatek wint Australian Open: zesde Grand Slam-titel voor de Poolse", image: "photo-1761927055615-f59ae714385b", excerpt: "In de finale versloeg ze Gauff in twee sets: 6-3 en 6-4.", timeAgo: "1 uur geleden" },
    { label: "ATP", title: "Djokovic trekt zich terug uit ATP Finals vanwege knieblessure", image: "photo-1530915365347-e35b749a0381", excerpt: "De Serviër meldde via sociale media dat hij nog niet 100 procent fit is.", timeAgo: "3 uur geleden" },
    { label: "Davis Cup", title: "Nederland bereikt halve finale Davis Cup na zege op Argentinië", image: "photo-1787311158758-740c4218de92", excerpt: "Tallon Griekspoor was de grote held met twee gewonnen rubbers op rij.", timeAgo: "Gisteren" },
  ],
  "sport/tennis/roland-garros": [
    { label: "Roland Garros", title: "Nadal kondigt afscheid aan op Roland Garros: 'De cirkel is rond'", image: "photo-1751274366746-330c22f8a5d9", excerpt: "De Spanjaard, 14-voudig winnaar op het Parijse gravel, maakt zijn laatste opwachting.", timeAgo: "2 uur geleden" },
    { label: "Roland Garros", title: "Swiatek favoriet maar Sabalenka jaagt op zand-primeur", image: "photo-1658530190197-29f63baaa460", excerpt: "Tennisexperts zijn verdeeld over wie dit jaar Roland Garros wint.", timeAgo: "4 uur geleden", premium: true },
  ],
  "sport/tennis/wimbledon": [
    { label: "Wimbledon", title: "Alcaraz verdedigt zijn Wimbledon-titel: 'Gras ligt me het best'", image: "photo-1783201033940-acd25eda0eac", excerpt: "De Spanjaard gaat als topfavoriet naar Londen.", timeAgo: "5 uur geleden" },
    { label: "Wimbledon", title: "Groen gras, strenge dresscode: Wimbledon trekt recordaantal bezoekers", image: "photo-1782994978958-72d19fb50ab0", excerpt: "De organisatie meldt een stijging van acht procent in de kaartverkoop. Ook de rij op de eerste dag was langer dan ooit.", timeAgo: "Gisteren" },
  ],
  "sport/tennis/us-open": [
    { label: "US Open", title: "Sinner wint US Open: eerste Italiaan ooit op de troon in Flushing Meadows", image: "photo-1602211844066-d3bb556e983b", excerpt: "In een meeslepende finale versloeg de 23-jarige Sinner Djokovic in vijf sets.", timeAgo: "Gisteren", premium: true },
    { label: "US Open", title: "Nachtsessie in New York eindigt pas om 03:15: nieuw record voor laat einde", image: "photo-1568663469495-b09d5e3c2e07", excerpt: "De vijfsetter tussen twee kwalificanten hield het stadion tot diep in de nacht wakker.", timeAgo: "3 uur geleden" },
  ],
  "sport/tennis/australian-open": [
    { label: "Australian Open", title: "Hitte-protocol van kracht in Melbourne: 42 graden op de baan", image: "photo-1595434971780-79d5c20c5090", excerpt: "Het hitteschild wordt geactiveerd. Medvedev verliet woedend de baan.", timeAgo: "3 uur geleden" },
    { label: "Australian Open", title: "Griekspoor bereikt tweede ronde na vijfsettenstrijd van 3 uur 40", image: "photo-1554068865-24cecd4e34b8", excerpt: "De Nederlander verloor de eerste twee sets maar vond zijn niveau.", timeAgo: "Gisteren" },
  ],
  "sport/wielrennen": [
    { label: "Tour de France", title: "Vingegaard pakt eindwinst in de Tour: historisch derde overwinning", image: "photo-1755198795482-f8409cec16cd", excerpt: "In de tijdrit naar Dijon soleerde de Deen naar de definitieve eindzege.", timeAgo: "1 uur geleden", premium: true },
    { label: "Vuelta", title: "Van Aert sprint naar ritzege — Evenepoel behoudt rode trui", image: "photo-1516147697747-02adcafd3fda", excerpt: "De Belg was de snelste in een massasprint in Madrid.", timeAgo: "3 uur geleden" },
    { label: "Classics", title: "Van der Poel wint Parijs-Roubaix na banden-drama in de finale", image: "photo-1753516231269-2a676b28f6fc", excerpt: "De wereldkampioen wist zijn leidersplaats te behouden ondanks een lekke band.", timeAgo: "Gisteren" },
  ],
  "sport/hockey": [
    { label: "WK", title: "Hockeydames pakken goud op WK na dramatische shoot-out tegen België", image: "photo-1734159319354-b9ead78dd441", excerpt: "Na 1-1 in de finale werd het in de shoot-out 3-2 voor Oranje.", timeAgo: "2 uur geleden" },
    { label: "EK", title: "Oranje heren verslaan Duitsland in EK-finale: vierde Europese titel", image: "photo-1780509459604-8e335e213e5b", excerpt: "De mannen van bondscoach Oltmans domineerden de finale en wonnen overtuigend met 4-1.", timeAgo: "Gisteren", premium: true },
  ],
  "sport/zwemmen": [
    { label: "WK", title: "Kira Toussaint pakt zilver op 100m rugslag bij WK kortebaan", image: "photo-1530549387789-4c1017266635", excerpt: "De Française Bonnet was nipt te snel, maar Toussaint verbeterde het Nederlands record.", timeAgo: "4 uur geleden" },
    { label: "Olympisch", title: "Sharon van Rouwendaal begint aan olympisch kwalificatietraject voor LA 2028", image: "photo-1597941034584-69982331105b", excerpt: "De olympisch kampioene richt haar pijlen op de Spelen van 2028.", timeAgo: "Gisteren" },
  ],
  "sport/atletiek": [
    { label: "Sprint", title: "Dafne Schippers verbetert Nederlands record op 100m in Amsterdam", image: "photo-1502904550040-7534597429ae", excerpt: "Met een tijd van 10,81 seconden verbrak ze haar eigen record uit 2015.", timeAgo: "1 uur geleden" },
    { label: "Marathon", title: "Abdi Nageeye wint marathon van Rotterdam in nieuw parcoursrecord", image: "photo-1761064039885-afa38ab58a21", excerpt: "De Nederlander liep 2:03:58 en versloeg een sterk internationaal deelnemersveld.", timeAgo: "Gisteren", premium: true },
  ],
  "iran/alles": [
    { label: "Nucleair", title: "Iran verrijkt uranium tot 83 procent, net onder wapenkwaliteit", image: "photo-1591200834528-4050ce99fe78", excerpt: "Het IAEA heeft de verrijking bevestigd na inspectie van de faciliteiten in Natanz.", timeAgo: "45 min geleden", premium: true },
    { label: "Diplomatiek", title: "EU legt nieuwe sancties op na aanhoudende schending mensenrechten", image: "photo-1594810205183-18a8b0ce6c13", excerpt: "De sancties richten zich op 32 Iraanse officials.", timeAgo: "2 uur geleden" },
    { label: "Protest", title: "Massale protesten in Tehran ondanks zware repressie door het regime", image: "photo-1708185663693-1f0a0707904d", excerpt: "Duizenden mensen kwamen naar het Azadi-plein.", timeAgo: "3 uur geleden" },
    { label: "Economie", title: "Iraanse rial bereikt historisch dieptepunt tegen de dollar", image: "photo-1499909694555-1ae5b7067b1a", excerpt: "Door opeenstapeling van sancties is de koopkracht gedaald met 60 procent.", timeAgo: "Gisteren" },
  ],
  "iran/politiek": [
    { label: "Machtsstrijd", title: "Intern conflict in Iraans regime: revolutionaire garde vs. gematigden", image: "photo-1780145882677-990bb510824a", excerpt: "Bronnen binnen het regime melden toenemende spanning.", timeAgo: "3 uur geleden", premium: true },
    { label: "Diplomatiek", title: "President Raisi bezoekt Beijing: 'China is onze strategische partner'", image: "photo-1590301729964-23833732ee04", excerpt: "De twee landen tekenden een reeks economische samenwerkingsakkoorden.", timeAgo: "1 uur geleden" },
  ],
  "iran/nucleair": [
    { label: "Nucleair", title: "Iran installeert geavanceerde centrifuges in Fordow-faciliteit", image: "photo-1513828742140-ccaa28f3eda0", excerpt: "Het IAEA waarschuwt dat de verrijkingscapaciteit aanzienlijk vergroot.", timeAgo: "2 uur geleden", premium: true },
    { label: "Diplomatiek", title: "Onderhandelingen over nucleair akkoord hervat in Genève", image: "photo-1633022326182-1b36700bc49a", excerpt: "Voor het eerst in negen maanden zitten de VS en Iran aan tafel.", timeAgo: "4 uur geleden" },
  ],
  "iran/sancties": [
    { label: "Sancties", title: "VS breiden sancties uit naar Iraanse oliesector: acht nieuwe tankers op lijst", image: "photo-1598408745613-178751e2ccde", excerpt: "Drie rederijen worden toegevoegd aan de zwarte lijst.", timeAgo: "30 min geleden" },
    { label: "Sancties", title: "Europese bedrijven trekken zich terug uit Iran na dreigen met secundaire sancties", image: "photo-1769051782031-ef8c6dce8795", excerpt: "Shell, Total en Siemens stoppen hun activiteiten.", timeAgo: "2 uur geleden" },
  ],
  "iran/mensenrechten": [
    { label: "Mensenrechten", title: "VN-rapporteur: aantal executies in Iran bereikte record van 834 in 2023", image: "photo-1543536833-6d65fcc64f66", excerpt: "Amnesty International spreekt van een 'schrikbewind'.", timeAgo: "1 uur geleden", premium: true },
    { label: "Vrouwen", title: "Iraanse vrouwen dragen hoofddoek weer verplicht na nieuwe wetgeving", image: "photo-1572578906052-f7f3edbecc68", excerpt: "Het parlement heeft strengere handhaving goedgekeurd.", timeAgo: "3 uur geleden" },
  ],
  "politiek/alles": [
    { label: "Formatie", title: "Coalitieakkoord gepresenteerd: 28 miljard voor koopkracht en klimaat", image: "photo-1719732882715-4194f657117f", excerpt: "Na 227 dagen onderhandelen hebben de vier partijen een akkoord bereikt.", timeAgo: "2 uur geleden" },
    { label: "Europa", title: "Europees Parlement stemt in met nieuwe AI-wetgeving: strengste ter wereld", image: "photo-1709240235273-ad1ebd0b22bf", excerpt: "De AI Act treedt gefaseerd in werking.", timeAgo: "3 uur geleden", premium: true },
    { label: "Wereld", title: "Biden tekent nieuwe veiligheidswetten vlak voor inauguratie opvolger", image: "photo-1577942948749-a3dbb5c6db0a", excerpt: "De uittredende president ondertekent een reeks maatregelen.", timeAgo: "4 uur geleden" },
  ],
  "politiek/nederland": [
    { label: "Formatie", title: "Coalitieakkoord gepresenteerd: 28 miljard voor koopkracht en klimaat", image: "photo-1719732882715-4194f657117f", excerpt: "Na 227 dagen onderhandelen hebben de vier partijen een akkoord bereikt.", timeAgo: "2 uur geleden" },
    { label: "Tweede Kamer", title: "Motie van wantrouwen verworpen: kabinet overleeft debat", image: "photo-1536181783029-1097aaf179de", excerpt: "Met 83 tegen 67 stemmen bleef het kabinet overeind.", timeAgo: "4 uur geleden", premium: true },
  ],
  "politiek/nederland/tweede-kamer": [
    { label: "Tweede Kamer", title: "Debat over begroting Defensie: oppositie eist meer transparantie", image: "photo-1719553946838-1190abdeee92", excerpt: "Geert Wilders en GroenLinks-fractieleider Klever willen inzage in de NAVO-contracten.", timeAgo: "1 uur geleden" },
    { label: "Tweede Kamer", title: "VVD en D66 bereiken akkoord over stikstofwet", image: "photo-1764702396928-2264b9eb49e4", excerpt: "Na maanden van onderhandelen gaan de partijen akkoord met een gedifferentieerde aanpak.", timeAgo: "Gisteren", premium: true },
  ],
  "politiek/nederland/kabinet": [
    { label: "Kabinet", title: "Ministerraad akkoord met nieuw klimaatpakket: 12 miljard investering", image: "photo-1509391366360-2e959784a276", excerpt: "Het kabinet presenteert een ambitieus pakket maatregelen.", timeAgo: "3 uur geleden" },
    { label: "Kabinet", title: "Minister Van der Wal stapt op na vertrouwenscrisis in de Kamer", image: "photo-1631220706319-657942774d02", excerpt: "Na het debat over de boerenprotesten kondigde de minister haar aftreden aan.", timeAgo: "Gisteren", premium: true },
  ],
  "politiek/nederland/provincies": [
    { label: "Provincies", title: "Noord-Holland kiest voor nieuwe coalitie: GroenLinks en VVD samen", image: "photo-1459679749680-18eb1eb37418", excerpt: "Na de Statenverkiezingen vormen de twee partijen een ongebruikelijke combinatie.", timeAgo: "Gisteren" },
    { label: "Provincies", title: "Provincie Utrecht trekt 200 miljoen uit voor woningbouw rond stations", image: "photo-1652294094412-7748207413fd", excerpt: "Gedeputeerde Staten willen nieuwbouw bundelen rond knooppunten van openbaar vervoer.", timeAgo: "4 uur geleden", premium: true },
  ],
  "politiek/nederland/gemeenten": [
    { label: "Gemeenten", title: "Amsterdam verhoogt ozb met 12 procent om begrotingstekort te dekken", image: "photo-1627964718300-fab24a8a85ce", excerpt: "Het college van B&W ziet geen andere mogelijkheid.", timeAgo: "2 uur geleden" },
    { label: "Gemeenten", title: "Rotterdam test gratis openbaar vervoer voor inwoners met een laag inkomen", image: "photo-1765401809244-888bddb45307", excerpt: "Het proefproject start in januari en loopt twee jaar. Zo'n 40.000 inwoners komen in aanmerking.", timeAgo: "Gisteren" },
  ],
  "politiek/europa": [
    { label: "EU", title: "Europees Parlement stemt in met nieuwe AI-wetgeving: strengste ter wereld", image: "photo-1709240235273-ad1ebd0b22bf", excerpt: "De AI Act treedt gefaseerd in werking.", timeAgo: "1 uur geleden" },
    { label: "EU", title: "Von der Leyen kondigt tweede termijn aan als Commissievoorzitter", image: "photo-1759169306825-d1d4b832ae3a", excerpt: "Met steun van de grootste fracties mikt ze op een nieuw mandaat.", timeAgo: "3 uur geleden", premium: true },
  ],
  "politiek/europa/eu": [
    { label: "EU", title: "Europese Raad debatteert over uitbreiding: Oekraïne dichter bij lidmaatschap", image: "photo-1594810459121-0dc1e2271b67", excerpt: "De staatshoofden spraken urenlang over het tijdpad voor toetreding.", timeAgo: "2 uur geleden", premium: true },
    { label: "EU", title: "Brussel presenteert plan voor gezamenlijke gasinkoop: lagere prijzen verwacht", image: "photo-1765810542186-c6becc0687b1", excerpt: "Lidstaten bundelen hun vraag om sterker te staan tegenover leveranciers.", timeAgo: "Gisteren" },
  ],
  "politiek/europa/duitsland": [
    { label: "Duitsland", title: "SPD verliest deelstaatverkiezingen in Beieren: historisch slecht resultaat", image: "photo-1552035496-08efc7baf40e", excerpt: "De sociaaldemocraten halen minder dan 9 procent.", timeAgo: "Gisteren" },
    { label: "Duitsland", title: "Duitse industrie krimpt voor het derde kwartaal op rij", image: "photo-1546185058-592ead754d27", excerpt: "Hoge energiekosten en zwakke export drukken op de grootste economie van Europa.", timeAgo: "3 uur geleden", premium: true },
  ],
  "politiek/europa/frankrijk": [
    { label: "Frankrijk", title: "Macron lost Assemblée Nationale op na verlies bij Europese verkiezingen", image: "photo-1502602898657-3e91760cbb34", excerpt: "De president verrast iedereen met vervroegde verkiezingen.", timeAgo: "3 uur geleden", premium: true },
    { label: "Frankrijk", title: "Franse boeren blokkeren snelwegen rond Parijs uit protest tegen handelsakkoord", image: "photo-1568680870491-590cd4e224ab", excerpt: "Honderden tractoren legden het verkeer urenlang plat.", timeAgo: "Gisteren" },
  ],
  "politiek/europa/vk": [
    { label: "VK", title: "Labour wint Britse verkiezingen met historische meerderheid: Starmer premier", image: "photo-1486299267070-83823f5448dd", excerpt: "De Conservatieven lijden hun zwaarste verkiezingsnederlaag in honderd jaar.", timeAgo: "Gisteren", premium: true },
    { label: "VK", title: "Britse centrale bank houdt rente gelijk ondanks hardnekkige inflatie", image: "photo-1754208490992-6ca3ab4db21a", excerpt: "De Bank of England wacht op meer data voordat ze de rente verder verlaagt.", timeAgo: "4 uur geleden" },
  ],
  "politiek/wereld": [
    { label: "VS", title: "Biden tekent nieuwe veiligheidswetten vlak voor inauguratie opvolger", image: "photo-1577942948749-a3dbb5c6db0a", excerpt: "De uittredende president ondertekent een reeks maatregelen.", timeAgo: "2 uur geleden" },
    { label: "China", title: "Xi Jinping maakt staatsbezoek aan Rusland te midden van oorlog in Oekraïne", image: "photo-1664019597420-da9184af1e9e", excerpt: "Het bezoek wordt door het Westen gezien als politieke steun voor Poetin.", timeAgo: "4 uur geleden", premium: true },
  ],
  "politiek/opinie": [
    { label: "Column", title: "Hoe het Westen Poetin miskende — en wat we ervan kunnen leren", image: "photo-1563166796-befbbd534d1b", excerpt: "Een terugblik op twintig jaar westerse Rusland-politiek. Door oud-ambassadeur Pieter Feith.", timeAgo: "3 uur geleden", premium: true },
    { label: "Opinie", title: "De klimaatcrisis vraagt om meer dan vliegtaks", image: "photo-1645884956076-2260c26cc9b6", excerpt: "Individuele maatregelen zijn niet genoeg. We hebben structureel beleid nodig.", timeAgo: "Gisteren" },
  ],
  "misdaad/alles": [
    { label: "Drugs", title: "Politie rolt groot drugsnetwerk op in Rotterdam-Haven: 23 arrestaties", image: "photo-1621697944804-d0a393f7e01a", excerpt: "Na een jaar undercover-operatie werd vannacht tegelijk op tien locaties ingevallen.", timeAgo: "1 uur geleden" },
    { label: "Rechtbank", title: "Taghi krijgt levenslang: rechtbank overtuigd van rol bij vijf moorden", image: "photo-1593115057322-e94b77572f20", excerpt: "De uitspraak was na drie jaar strafproces.", timeAgo: "3 uur geleden", premium: true },
    { label: "Fraude", title: "Voormalig ABN-directeur schuldig aan fraude van 40 miljoen euro", image: "photo-1621831337128-35676ca30868", excerpt: "De rechtbank in Amsterdam achtte bewezen dat hij jarenlang klantgeld overhevelde.", timeAgo: "4 uur geleden" },
  ],
  "misdaad/rechtbank": [
    { label: "Rechtbank", title: "Uitspraak in zaak-Taghi: levenslang voor leider criminele organisatie", image: "photo-1658958327132-a80f8a9409fb", excerpt: "De rechtbank Amsterdam deed na drie jaar strafproces uitspraak.", timeAgo: "2 uur geleden", premium: true },
    { label: "Rechtbank", title: "Kroongetuige Nabil B. getuigt: 'Taghi belde zelf met de opdracht'", image: "photo-1780396209853-a771d772e56d", excerpt: "Op de zitting van gisteren gaf de kroongetuige gedetailleerde verklaringen.", timeAgo: "Gisteren" },
  ],
  "misdaad/drugs": [
    { label: "Cocaine", title: "Recordvangst: 10 ton cocaine gevonden in scheepslading bananen in Antwerpen", image: "photo-1640958900081-7b069dd23e9c", excerpt: "De straatwaarde wordt geschat op meer dan een miljard euro.", timeAgo: "1 uur geleden" },
    { label: "Beleid", title: "Rapport: legalisatie cannabis reduceert drugscriminaliteit met 23 procent", image: "photo-1591754060004-f91c95f5cf05", excerpt: "Een vergelijkend onderzoek naar Canada, Uruguay en Nederland.", timeAgo: "Gisteren" },
  ],
  "misdaad/drugs/cocaine": [
    { label: "Cocaine", title: "Antwerpen is het cocaine-hart van Europa: hoe de haven zo kwetsbaar werd", image: "photo-1702499384351-8f84e3f9281c", excerpt: "Een reconstructie van tien jaar cocaïnehandel via de op twee na grootste haven.", timeAgo: "2 uur geleden", premium: true },
    { label: "Cocaine", title: "Havenbedrijf Rotterdam krijgt scanners voor elke container uit Zuid-Amerika", image: "photo-1559297434-fae8a1916a79", excerpt: "De douane verwacht met de nieuwe scanstraat het aantal onderschepte zendingen te verdubbelen.", timeAgo: "Gisteren" },
  ],
  "misdaad/drugs/xtc": [
    { label: "XTC", title: "Nederland produceert nog steeds 80 procent van wereldwijde XTC-voorraad", image: "photo-1628771065518-0d82f1938462", excerpt: "Ondanks jarenlange bestrijding is Brabant het mondiale epicentrum.", timeAgo: "3 uur geleden" },
    { label: "XTC", title: "Drugslab in Brabantse schuur ontdekt: chemisch afval bedreigt grondwater", image: "photo-1558617867-659c667b6809", excerpt: "De politie trof duizenden liters grondstoffen aan. De brandweer sloot het terrein af.", timeAgo: "Gisteren", premium: true },
  ],
  "misdaad/drugs/wietteelt": [
    { label: "Wietteelt", title: "Eerste legale wietkwekers starten productie: experiment gereguleerde teelt", image: "photo-1586053113575-4f3b3ca59a04", excerpt: "Tien telers in Breda en Tilburg mogen cannabis produceren voor de coffeeshopmarkt.", timeAgo: "1 uur geleden" },
    { label: "Wietteelt", title: "Burgemeesters willen snellere uitbreiding van het wietexperiment", image: "photo-1519181236443-b175d4c3ca1d", excerpt: "Zes gemeenten dringen bij het kabinet aan op meer deelnemende telers.", timeAgo: "4 uur geleden" },
  ],
  "misdaad/drugs/synthetisch": [
    { label: "Fentanyl", title: "Fentanyl opgedoken in Amsterdam: eerste overdosis-doden bevestigd", image: "photo-1631980838902-e1eea9c12c67", excerpt: "Toxicologen bevestigen dat het opiaat verantwoordelijk is voor drie sterfgevallen.", timeAgo: "2 uur geleden", premium: true },
    { label: "Synthetisch", title: "Nieuwe designerdrug duikt op in het uitgaansleven: waarschuwing van GGD", image: "photo-1578736641330-3155e606cd40", excerpt: "Het middel wordt verkocht als xtc maar is aanzienlijk gevaarlijker.", timeAgo: "Gisteren" },
  ],
  "misdaad/fraude": [
    { label: "Toeslagen", title: "Toeslagenaffaire: commissie eist stelselherziening van de belastingdienst", image: "photo-1583521214690-73421a1829a9", excerpt: "Na jaren van onrecht voor duizenden ouders wil de commissie een cultuurwijziging.", timeAgo: "2 uur geleden" },
    { label: "Fraude", title: "Oplichter verkoopt honderden nep-vakantieboekingen via grote platforms", image: "photo-1654355252504-42c1c9dd1fe0", excerpt: "De man opereerde zes jaar onopgemerkt en maakte meer dan 1,4 miljoen euro buit.", timeAgo: "3 uur geleden", premium: true },
  ],
  "misdaad/moord": [
    { label: "Cold case", title: "Politie lost cold case op na 35 jaar: DNA-match leidt naar verdachte in Gent", image: "photo-1718592168437-8382e5b97736", excerpt: "De zaak-Femke Brouwer, die in 1989 onopgelost bleef, wordt heropend.", timeAgo: "1 uur geleden" },
    { label: "Liquidatie", title: "Advocaat Derk Wiersum: twee jaar later wordt hoofdverdachte uitgeleverd", image: "photo-1598449935381-54511437c927", excerpt: "België levert de verdachte van de moord op de Taghi-advocaat uit.", timeAgo: "3 uur geleden", premium: true },
  ],
  "misdaad/cybercrime": [
    { label: "Ransomware", title: "Ransomware legt drie gemeenten plat: burgerdiensten weken offline", image: "photo-1489875347897-49f64b51c1f8", excerpt: "Eindhoven, Helmond en Tilburg zijn getroffen. Losgeld van 3,5 miljoen geëist.", timeAgo: "2 uur geleden" },
    { label: "Datalek", title: "Ziekenhuizen doelwit van phishingcampagne: patiëntdata van 80.000 mensen gelekt", image: "photo-1719934398679-d764c1410770", excerpt: "Drie ziekenhuizen schreven patiënten aan vanwege een mogelijk datalek.", timeAgo: "Gisteren" },
  ],
}

function getContentKey(tabId: string, pillId?: string, submenuId?: string): string {
  if (!pillId) return tabId
  if (submenuId) {
    const key = `${tabId}/${pillId}/${submenuId}`
    if (CONTENT[key]) return key
  }
  return `${tabId}/${pillId}`
}

// ─── Components ──────────────────────────────────────────────────────────────

function unsplashUrl(photo: string, width: number) {
  return `https://images.unsplash.com/${photo}?w=${width}&q=80&fit=crop&auto=format`
}

function ArticleImage({ photo, alt, index }: { photo?: string; alt: string; index: number }) {
  const [failed, setFailed] = useState(false)
  const shades = ["#e8e8e8", "#e4e4e4", "#ececec", "#e6e6e6"]
  return (
    <div style={{
      width: "100%",
      aspectRatio: "16/9",
      background: shades[index % shades.length],
      borderRadius: 2,
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {photo && !failed && (
        <img
          src={unsplashUrl(photo, 800)}
          srcSet={`${unsplashUrl(photo, 600)} 600w, ${unsplashUrl(photo, 1200)} 1200w`}
          sizes="(max-width: 600px) 100vw, 600px"
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}
    </div>
  )
}

function ArticleTeaser({ article, index }: { article: Article; index: number }) {
  return (
    <article style={{ padding: "0 16px 24px" }}>
      <ArticleImage photo={article.image} alt={article.title} index={index} />
      <div style={{ marginTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#2b70e8" }}>
            {article.label}
          </span>
          {article.premium && (
            <span style={{
              fontSize: 11, fontWeight: 600, color: "#b07d10",
              background: "#fef3c7", padding: "2px 6px", borderRadius: 4,
            }}>
              Premium
            </span>
          )}
          <span style={{ fontSize: 12, color: "#aaa", marginLeft: "auto", flexShrink: 0 }}>
            {article.timeAgo}
          </span>
        </div>
        <p style={{ fontSize: 22, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.35, margin: "0 0 6px" }}>
          {article.title}
        </p>
        <p style={{ fontSize: 16, color: "#666", lineHeight: 1.6, margin: 0 }}>
          {article.excerpt}
        </p>
      </div>
    </article>
  )
}

function Pill({
  pill,
  active,
  menuOpen,
  activeSubmenuLabel,
  onSelect,
  onChevronClick,
  onClearSubmenu,
}: {
  pill: PillConfig
  active: boolean
  menuOpen: boolean
  activeSubmenuLabel?: string
  onSelect: () => void
  onChevronClick: () => void
  onClearSubmenu: () => void
}) {
  const hasSubmenuActive = !!activeSubmenuLabel && active
  const hasRightControl = pill.chevron || hasSubmenuActive

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={e => e.key === "Enter" && onSelect()}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: hasRightControl ? 8 : 4,
        height: 36,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: hasRightControl ? 9 : 12,
        borderRadius: 9999,
        flexShrink: 0,
        whiteSpace: "nowrap",
        userSelect: "none",
        cursor: "pointer",
        backgroundColor: "rgba(255,255,255,0.1)",
        border: active ? "1px solid #0088ff" : "1px solid white",
        boxShadow: active ? "none" : "0px 2px 10px 0px rgba(0,0,0,0.15)",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
    >
      {pill.icon && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          width: 18,
          height: 18,
          color: "#1a1a1a",
        }}>
          {pill.icon}
        </div>
      )}

      <span style={{
        fontFamily: '"SF Pro Text", -apple-system, sans-serif',
        fontSize: 16,
        fontWeight: 400,
        color: "#1a1a1a",
        lineHeight: 1.15,
      }}>
        {pill.label}
      </span>

      {hasSubmenuActive && (
        <>
          <span style={{ fontSize: 14, color: "rgba(26,26,26,0.4)", lineHeight: 1.15 }}>›</span>
          <span style={{
            fontFamily: '"SF Pro Text", -apple-system, sans-serif',
            fontSize: 14,
            fontWeight: 400,
            color: "#1a1a1a",
            lineHeight: 1.15,
          }}>
            {activeSubmenuLabel}
          </span>
          <button
            style={{
              width: 16, height: 16, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(26,26,26,0.5)",
            }}
            onClick={e => { e.stopPropagation(); onClearSubmenu() }}
            aria-label="Verwijder filter"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </>
      )}

      {!hasSubmenuActive && pill.chevron && (
        <button
          style={{
            width: 16, height: 16, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 9999,
            backgroundColor: menuOpen ? "#0088ff" : "transparent",
            transition: "background-color 0.15s",
          }}
          onClick={e => { e.stopPropagation(); onChevronClick() }}
          aria-label={`Open ${pill.label} submenu`}
        >
          <svg
            width="7.54" height="4.47" viewBox="0 0 7.53843 4.47175" fill="none"
            style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
          >
            <path d="M3.76922 4.47175L0 0.70255L0.70255 0L3.76922 3.06667L6.83588 0L7.53843 0.70255L3.76922 4.47175Z" fill={menuOpen ? "white" : "black"} />
          </svg>
        </button>
      )}
    </div>
  )
}

// ─── Tab Pill Row (top-level nav as pills; Sport opens a dropdown) ────────────

function TabPillRow({
  tabs,
  activeIdx,
  tabRefs,
  rowRef,
  onSelect,
  menuTabId,
  onToggleMenu,
  getSelectedLabel,
  onClear,
}: {
  tabs: TabConfig[]
  activeIdx: number
  tabRefs: { current: (HTMLElement | null)[] }
  rowRef: { current: HTMLDivElement | null }
  onSelect: (idx: number) => void
  menuTabId: string | null
  onToggleMenu: (tabId: string) => void
  getSelectedLabel: (tabId: string) => string | undefined
  onClear: (tabId: string) => void
}) {
  return (
    <div
      ref={rowRef}
      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", minWidth: "max-content" }}
    >
      {tabs.map((tab, idx) => {
        const active = idx === activeIdx
        // A tab is a dropdown if it carries a real submenu below (e.g. Sport).
        const hasDropdown = tab.pills.length > 1
        const menuOpen = menuTabId === tab.id
        const selectedLabel = getSelectedLabel(tab.id)
        const hasPath = !!selectedLabel
        const hasRightControl = hasPath || hasDropdown

        return (
          <div
            key={tab.id}
            role="button"
            tabIndex={0}
            ref={el => { tabRefs.current[idx] = el }}
            onClick={() => onSelect(idx)}
            onKeyDown={e => e.key === "Enter" && onSelect(idx)}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: hasRightControl ? 8 : 4,
              height: 36,
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 12,
              paddingRight: hasRightControl ? 9 : 12,
              borderRadius: 9999,
              flexShrink: 0,
              whiteSpace: "nowrap",
              userSelect: "none",
              cursor: "pointer",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: active ? "1px solid #0088ff" : "1px solid white",
              boxShadow: active ? "none" : "0px 2px 10px 0px rgba(0,0,0,0.15)",
              transition: "border-color 0.15s, box-shadow 0.15s",
            }}
          >
            <span style={{
              fontFamily: '"SF Pro Text", -apple-system, sans-serif',
              fontSize: 16,
              fontWeight: 400,
              color: "#1a1a1a",
              lineHeight: 1.15,
            }}>
              {tab.label}
            </span>

            {hasPath && (
              <>
                <span style={{ fontSize: 14, color: "rgba(26,26,26,0.4)", lineHeight: 1.15 }}>›</span>
                <span style={{
                  fontFamily: '"SF Pro Text", -apple-system, sans-serif',
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#1a1a1a",
                  lineHeight: "18.4px",
                }}>
                  {selectedLabel}
                </span>
                <button
                  style={{
                    width: 24, height: 24, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(26,26,26,0.5)",
                  }}
                  onClick={e => { e.stopPropagation(); onClear(tab.id) }}
                  aria-label="Verwijder filter"
                >
                  <svg width="10" height="10" viewBox="0 0 8 8" fill="none">
                    <path d="M1 1L7 7M7 1L1 7" stroke="rgba(26,26,26,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </>
            )}

            {!hasPath && hasDropdown && (
              <button
                style={{
                  width: 24, height: 24, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 9999,
                  backgroundColor: menuOpen ? "#0088ff" : "transparent",
                  transition: "background-color 0.15s",
                }}
                onClick={e => { e.stopPropagation(); onToggleMenu(tab.id) }}
                aria-label={`Open ${tab.label} menu`}
              >
                <svg
                  width="12" height="6" viewBox="0 0 7.53843 4.47175" fill="none"
                  style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
                >
                  <path d="M3.76922 4.47175L0 0.70255L0.70255 0L3.76922 3.06667L6.83588 0L7.53843 0.70255L3.76922 4.47175Z" fill={menuOpen ? "white" : "black"} />
                </svg>
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

function SectionPlaceholder({ id }: { id: string }) {
  const item = NAV_ITEMS.find(i => i.id === id)
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        color: "#49454F",
      }}
    >
      <span style={{ transform: "scale(2)", color: "#2766F5" }}>{item?.icon}</span>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", margin: "12px 0 0" }}>{item?.label}</h1>
      <p style={{ fontSize: 13, margin: 0 }}>Nog niet uitgewerkt in dit prototype</p>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [navPrefs, setNavPrefs] = useState(loadNavPrefs)
  const [activeNavId, setActiveNavId] = useState(() => navPrefs.opening)
  const [activeTabIdx, setActiveTabIdx] = useState(0)
  const [activePills, setActivePills] = useState<Record<string, string>>({})
  const [selectedSubmenu, setSelectedSubmenu] = useState<Record<string, Record<string, string>>>({})
  const [openMenuPillId, setOpenMenuPillId] = useState<string | null>(null)
  const [openTabMenuId, setOpenTabMenuId] = useState<string | null>(null)

  const swipeStartX = useRef<number | null>(null)
  const swipeStartY = useRef<number | null>(null)
  const swipeDir = useRef<"h" | "v" | null>(null)
  const [dragOffsetX, setDragOffsetX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const tabRefs = useRef<(HTMLElement | null)[]>([])
  const pillRowRef = useRef<HTMLDivElement>(null)
  const tabRowRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerTranslate = useRef(0)
  const panelScrollTop = useRef(0)
  const HEADER_HEIGHT = 106

  const handleContentScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const scrollTop = el.scrollTop
    const delta = scrollTop - panelScrollTop.current
    panelScrollTop.current = scrollTop

    const next = Math.max(0, Math.min(HEADER_HEIGHT, headerTranslate.current + delta))
    headerTranslate.current = next

    if (headerRef.current) {
      headerRef.current.style.transform = `translateY(-${next}px)`
      headerRef.current.style.marginBottom = `-${next}px`
    }
  }, [])

  const activeTab = MAIN_TABS[activeTabIdx]
  const activePillId = activePills[activeTab.id] ?? activeTab.pills[0]?.id
  const activeSubmenuId = activePillId ? selectedSubmenu[activeTab.id]?.[activePillId] : undefined
  const contentKey = getContentKey(activeTab.id, activePillId, activeSubmenuId)
  const articles = CONTENT[contentKey] ?? CONTENT[activeTab.id] ?? []

  useEffect(() => {
    tabRefs.current[activeTabIdx]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    pillRowRef.current?.scrollTo({ left: 0, behavior: "smooth" })
  }, [activeTabIdx])

  // Document-level non-passive touchmove listener: once a horizontal swipe is
  // detected, preventDefault stops vertical drift on any scroll container in the tree.
  useEffect(() => {
    const handler = (e: TouchEvent) => {
      if (swipeDir.current === "h") e.preventDefault()
    }
    document.addEventListener("touchmove", handler, { passive: false })
    return () => document.removeEventListener("touchmove", handler)
  }, [])

  function goToTab(idx: number) {
    setOpenTabMenuId(null)
    if (idx === activeTabIdx) return
    setActiveTabIdx(idx)
    setOpenMenuPillId(null)
    panelScrollTop.current = 0
    headerTranslate.current = 0
    if (headerRef.current) {
      headerRef.current.style.transform = "translateY(0)"
      headerRef.current.style.marginBottom = "0"
    }
  }

  function selectPill(tabId: string, pillId: string) {
    setActivePills(prev => ({ ...prev, [tabId]: pillId }))
    setOpenMenuPillId(null)
    if (activePills[tabId] !== pillId) {
      setSelectedSubmenu(prev => ({
        ...prev,
        [tabId]: { ...prev[tabId], [pillId]: undefined as unknown as string },
      }))
    }
  }

  function selectSubmenuItem(tabId: string, pillId: string, submenuId: string) {
    setActivePills(prev => ({ ...prev, [tabId]: pillId }))
    setSelectedSubmenu(prev => ({ ...prev, [tabId]: { ...prev[tabId], [pillId]: submenuId } }))
    setOpenMenuPillId(null)
  }

  function clearSubmenu(tabId: string, pillId: string) {
    setSelectedSubmenu(prev => {
      const tabMap = { ...prev[tabId] }
      delete tabMap[pillId]
      return { ...prev, [tabId]: tabMap }
    })
  }

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    swipeStartX.current = e.touches[0].clientX
    swipeStartY.current = e.touches[0].clientY
    swipeDir.current = null
    setIsDragging(true)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (swipeStartX.current === null) return
    const dx = e.touches[0].clientX - swipeStartX.current
    const dy = e.touches[0].clientY - (swipeStartY.current ?? 0)
    if (!swipeDir.current && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      swipeDir.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v"
    }
    if (swipeDir.current === "h") setDragOffsetX(dx)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (swipeDir.current === "h") {
      const threshold = 55
      if (dragOffsetX < -threshold && activeTabIdx < MAIN_TABS.length - 1) {
        setActiveTabIdx(i => i + 1); setOpenMenuPillId(null); setOpenTabMenuId(null)
      } else if (dragOffsetX > threshold && activeTabIdx > 0) {
        setActiveTabIdx(i => i - 1); setOpenMenuPillId(null); setOpenTabMenuId(null)
      }
    }
    swipeStartX.current = null; swipeStartY.current = null; swipeDir.current = null
    setDragOffsetX(0); setIsDragging(false)
  }, [dragOffsetX, activeTabIdx])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    swipeStartX.current = e.clientX; swipeDir.current = "h"; setIsDragging(true)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (swipeStartX.current === null) return
    setDragOffsetX(e.clientX - swipeStartX.current)
  }, [])

  const onMouseUp = useCallback(() => {
    const threshold = 55
    if (dragOffsetX < -threshold && activeTabIdx < MAIN_TABS.length - 1) {
      setActiveTabIdx(i => i + 1); setOpenMenuPillId(null); setOpenTabMenuId(null)
    } else if (dragOffsetX > threshold && activeTabIdx > 0) {
      setActiveTabIdx(i => i - 1); setOpenMenuPillId(null); setOpenTabMenuId(null)
    }
    swipeStartX.current = null; swipeDir.current = null
    setDragOffsetX(0); setIsDragging(false)
  }, [dragOffsetX, activeTabIdx])

  const vpWidth = viewportRef.current?.offsetWidth ?? 390
  const dragPct = isDragging && swipeDir.current === "h" ? (dragOffsetX / vpWidth) * (100 / MAIN_TABS.length) : 0
  const translatePct = (activeTabIdx / MAIN_TABS.length) * 100 - dragPct

  function getSubmenuLabel(tabId: string, pillId: string): string | undefined {
    const id = selectedSubmenu[tabId]?.[pillId]
    if (!id) return undefined
    const tab = MAIN_TABS.find(t => t.id === tabId)
    const pill = tab?.pills.find(p => p.id === pillId)
    return pill?.submenu?.find(s => s.id === id)?.label
  }

  const openDropdownPill = openMenuPillId ? activeTab.pills.find(p => p.id === openMenuPillId && p.submenu) : null

  return (
    <div style={{ background: "white", height: "100%", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Home view stays mounted (hidden) while another bottom-nav section is open, so its state survives */}
      <div style={{ flex: 1, minHeight: 0, display: activeNavId === "home" ? "flex" : "none", flexDirection: "column" }}>

      {/* ── Header — translates up with scroll, comes back on scroll-up ── */}
      <div
        ref={headerRef}
        style={{ flexShrink: 0, zIndex: 30, willChange: "transform" }}
      >
        <Navigation20MobileAppIos />
      </div>

      <SiteNav
        activeId={activeTab.id}
        onSelect={id => goToTab(MAIN_TABS.findIndex(t => t.id === id))}
      />

      {/* ── Swipeable Content Carousel ── */}
      <div
        ref={viewportRef}
        style={{ flex: 1, overflow: "hidden", position: "relative" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            width: `${MAIN_TABS.length * 100}%`,
            transform: `translateX(-${translatePct}%)`,
            transition: isDragging ? "none" : "transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94)",
            willChange: "transform",
          }}
        >
          {MAIN_TABS.map((tab, tabIdx) => {
            const panelPillId = activePills[tab.id] ?? tab.pills[0]?.id
            const panelSubmenuId = panelPillId ? selectedSubmenu[tab.id]?.[panelPillId] : undefined
            const panelKey = getContentKey(tab.id, panelPillId, panelSubmenuId)
            const panelArticles = CONTENT[panelKey] ?? CONTENT[tab.id] ?? []

            const panelPill = tab.pills.find(p => p.id === panelPillId)
            const panelSubmenuLabel = panelSubmenuId
              ? panelPill?.submenu?.find(s => s.id === panelSubmenuId)?.label
              : undefined
            const pageTitle = panelSubmenuLabel
              ? panelSubmenuLabel
              : panelPillId && panelPillId !== "alles"
                ? (panelPill?.label ?? tab.label)
                : tab.label

            return (
              <div
                key={tab.id}
                style={{ width: `${100 / MAIN_TABS.length}%`, height: "100%", overflowY: "auto" }}
                onScroll={tabIdx === activeTabIdx ? handleContentScroll : undefined}
              >
                <div style={{ padding: "16px 16px 12px" }}>
                  <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2, margin: 0 }}>
                    {tabIdx === activeTabIdx ? pageTitle : tab.label}
                  </h1>
                  <p style={{ fontSize: 13, color: "#aaa", margin: "4px 0 0" }}>
                    {panelArticles.length} artikel{panelArticles.length !== 1 ? "en" : ""}
                  </p>
                </div>

                {panelArticles.map((article, i) => (
                  <ArticleTeaser key={i} article={article} index={i} />
                ))}

                <div style={{ height: 32 }} />
              </div>
            )
          })}
        </div>
      </div>

      </div>

      {activeNavId !== "home" && <SectionPlaceholder id={activeNavId} />}

      <BottomNav
        prefs={navPrefs}
        onPrefsChange={setNavPrefs}
        activeId={activeNavId}
        onSelect={setActiveNavId}
      />
    </div>
  )
}
