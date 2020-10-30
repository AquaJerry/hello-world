# Make Arch Linux on Surface Go 2
2020.10.27


## Ready

`cp archlinux.iso /dev/sd`?(USB) on another linux pc

Power on Surface GO 2 m3 4+64 (SGO2)

Press F1 till keyboard backlight off

Power options > Choose what the power buttons do > Disable fast startup

Power off SGO2

Connect SGO2 and USB

Hold SGO2 volume up, power on it

Security > Disable secure boot

Boot Configuration > Enable other boot sequences, boot from USB Devices

Hold SGO2 volume down, tap restart


## Arch ISO


### root@archiso


#### Make SGO2 Arch bootable

`fdisk /dev/mmcblk0`

- [ ] partition mmc

`mkfs.vfat -F32 /dev/mmcblk0p1`

`mkfs.ext4 /dev/mmcblk0p2`

`mount /dev/mmcblk0p2 /mnt`

`mkdir /mnt/boot`

`mount /dev/mmcblk0p1 /mnt/boot`

`iwctl`

`station wlan0 connect `*(wifi) `^D`(ctrl d)

`pacstrap /mnt base linux-lts linux-firmware intel-ucode iwd vi uim xorg-server xorg-xinit dmenu firefox wqy-microhei`

Select `ttf-bitstream-vera`

`genfstab /mnt >> /mnt/etc/fstab`

```efibootmgr -d /dev/mmcblk0 -p 1 -c -L arch -l /vmlinuz-linux-lts -u root=PARTUUID=`ls -l /dev/disk/by-partuuid|grep mmcblk0p2|cut -d' ' -f9`' rw initrd=\intel-ucode.img initrd=\initramfs-linux-lts.img'```


#### Super user and web browser usable

`vim /mnt/etc/pam.d/su` uncomment `auth sufficient pam_wheel.so trust use_uid`

`echo a>/mnt/etc/hostname`

`echo -e '127.0.0.1 localhost\n::1 localhost\n127.0.1.1 a.localdomain a'>/mnt/etc/hosts`

`echo -e '[General]\nEnableNetworkConfiguration=true\n[Network]\nNameResolvingService=systemd\n[Scan]\nDisablePeriodicScan=true'>/mnt/etc/iwd/main.conf`

`cd /tmp;curl -L github.com/aquajerry/dwm/archive/my.zip -odwm.zip;unzip dwm.zip;cd dwm-my;make;mv dwm /mnt/usr/local/bin`(require cc make unzip)

`cd /tmp;curl dl.suckless.org/st/st-`version`.tar.gz -ost.tar.gz;tar xf st.tar.gz;cd st-*;make;mv st /mnt/usr/local/bin`(require cc make pkgconf)

`echo exec dwm>/mnt/etc/X11/xinit/xinitrc`


#### Right ctrl and power save

`echo -e 'evdev:input:*\n KEYBOARD_KEY_70050=rightctrl\n KEYBOARD_KEY_700e3=left'>/mnt/etc/udev/hwdb.d/10-my-modifiers.hwdb`

`vim /mnt/etc/systemd/coredump.conf` set `Storage=none`, `ProcessSizeMax=0`

`vim /mnt/etc/systemd/journald.conf` set `Storage=none`

`echo -e 'kernel.dmesg_restrict=1\nkernel.nmi_watchdog=0\nvm.dirty_background_ratio=1\nvm.dirty_ratio=2\nvm.dirty_writeback_centisecs=6000'>/mnt/etc/sysctl.d/99-sysctl.conf`

```echo -e 'Section "Monitor"\n\tIdentifier "eDP-1"\n\t'`cvt 1200 800 30|tail -n1`'\n\tOption "PreferredMode" "1200x800_30.00"\nEndSection'>/mnt/etc/X11/xorg.conf.d/10-monitor.conf```

`echo -e 'w /sys/devices/system/cpu/cpufreq/policy?/energy_performance_preference - - - - power\nw /sys/devices/system/cpu/intel_pstate/no_turbo - - - - 1'>/mnt/etc/tmpfiles.d/power.conf`

`echo -e 'options iwlwifi power_save=1\noptions snd_hda_intel power_save=1'>/mnt/etc/modprobe.d/power.conf`


#### Other

`vim /mnt/usr/share/X11/xorg.conf.d/40-libinput.conf` in `Section "InputClass"` add `Option "NaturalScrolling" "on"`, `Option "Tapping" "on"`

`echo unset HISTFILE>/mnt/root/.bashrc`

`vim /mnt/etc/fonts/font.conf` in `<fontconfig>` add `<selectfont><rejectfont><glob>/usr/share/fonts/*otf</glob></rejectfont></selectfont>`

`vim /mnt/etc/fonts/conf.d/60-latin.conf` in `<alias>` of `<family>` `monospace` prepend `<family>Bitstream Vera Sans Mono</family>`


### root@a

`arch-chroot /mnt`

`passwd -d root`

`useradd -mr -gwheel z`

`passwd -d z`

`^D`


### root@archiso again

`echo unset HISTFILE>/mnt/home/z/.bashrc`

`echo exec startx>/mnt/home/z/.bash_profile`

`vim /mnt/etc/systemd/system/getty.target.wants/getty\@tty1.service` at `[Service]` `ExecStart` substitute `-o '-p -- \\u'` with `-az`

`reboot`

Disconnect SGO2 and USB


## SGO2 Arch

Alt Shift Enter

`systemctl enable iwd systemd-resolved`

`systemctl start iwd systemd-resolved`

`su` `echo 75 >/sys/class/backlight/intel_backlight/brightness`

- [ ] unmute by `alsa-utils` package
- [ ] simplify firefox
- [ ] uim input method
