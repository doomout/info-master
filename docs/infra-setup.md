Raspberry Pi 4 서버 환경 구축 기록(2026.01.14)
# 1. 목적

본 문서는 info-master 프로젝트를 실제 운영 환경으로 배포하기 위해  
Raspberry Pi 4를 서버로 구축한 과정을 기록한다.

- 개인 서버 운영 경험 축적

- Docker 기반 환경 표준화

- 개발/운영 환경 분리

- 재설치 가능한 절차 문서화

# 2. 하드웨어 / 환경
## Hardware

- Raspberry Pi 4 (ARM64)

- microSD 카드 (32GB 이상)

- 유선 LAN / Wi-Fi 지원

## OS

- Raspberry Pi OS (64-bit)

- GUI 포함 버전 (Bookworm 계열)

- ARM64 (aarch64) 아키텍처
```bash
uname -m
# aarch64
```
# 3. 설치 전략

- 서버 운영 목적이므로 모니터/키보드 없이 원격 접속 위주

- Raspberry Pi Imager의 고급 설정을 활용하여 초기 세팅

## Imager 고급 설정

- SSH 활성화

- 사용자 계정 생성

- Wi-Fi SSID / Password 사전 설정

- Locale / Timezone 설정 (Asia/Seoul)

# 4. 네트워크 확인
```bash
# SSH 접속
ssh 설정한id@raspberrypi.local


# 또는 IP 직접 접속:

ssh doomout@192.168.xxx.xxx

# 네트워크 상태 확인
ip addr
```
## 확인 결과:

- Wi-Fi 인터페이스(wlan0) 정상

- IP 주소 할당 확인

- 이후 유선(eth0) 전환 가능

# 5. OS 업데이트

- 초기 설치 후 반드시 전체 업데이트 수행:
```bash
sudo apt update
sudo apt upgrade -y
sudo reboot
```

- 보안 패치

- 커널 / 펌웨어 업데이트

- 패키지 신뢰성 확보

# 6. Docker 설치
```bash
# Docker 설치 (공식 스크립트)
curl -fsSL https://get.docker.com | sudo sh

# 사용자 권한 설정
sudo usermod -aG docker doomout
sudo reboot
```
# 7. Docker 정상 동작 확인
```bash
# 버전 확인
docker --version

# 테스트 컨테이너 실행
docker run hello-world
```
- 성공 시 출력:
```css
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

# 8. 현재 서버 상태 요약(2026.01.14)

- Raspberry Pi 4 서버 정상 구축

- 네트워크 안정화 완료

- Docker 정상 동작

- 컨테이너 기반 서비스 배포 준비 완료

# 9. 다음 단계 예정

- PostgreSQL 16 Docker 컨테이너 구성

- Spring Boot(info-master) 백엔드 배포

- React 정적 파일 + Nginx

- 도메인 연결 및 HTTPS 적용

# 10. 비고

- 서버 운영 목적상 VNC 사용은 최소화

- 관리 작업은 SSH 기반으로 수행

- Docker 기반으로 재설치/이전 용이성 확보