# Make Arch Linux on Surface Go 2 (SGO2)
2020.10.27

## Ready

`cp archlinux.iso /dev/sd`?(USB) on another linux pc

Power on SGO2

Power options > Choose what the power buttons do > Disable fast startup

Power off SGO2

Connect SGO2 and USB

Hold SGO2 volume up, power on it

Security > Disable secure boot

Boot Configuration > Enable other boot sequences, boot from USB Devices

Hold SGO2 volume down, tap restart


## Arch ISO

`iwctl`

`station wlan0 connect `*(wifi) `^D`(ctrl d)
