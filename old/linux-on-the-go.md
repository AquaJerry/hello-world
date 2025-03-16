# Linux on the Go

Install Termux, Termux:X11, then in Termux

`pkg up`

`pkg i --no-install-recommends --no-install-suggests x11-repo`

`pkg i --no-install-recommends --no-install-suggests termux-x11-nightly`

`curl -L github.com/aquajerry/dwm/archive/my.zip -odwm.zip;unzip dwm.zip;cd dwm-my;make;mv dwm /data/data/com.termux/files/usr/bin`(require cc make unzip; if error, try `pkg i xorgproto`); dmenu required; firefox, vim suggested

Then touch a file as startup script of Termux like this:
```
pulseaudio --exit-idle-time=-1 --load='module-native-protocol-tcp auth-anonymous=1 auth-ip-acl=127.0.0.1' --start
termux-x11 -xstartup dwm

If you meet Samsung Keyboard bugs, try other keyboard and `adb shell pm disable-user com.samsung.android.honeyboard`.
```
If you can't hear any sound on some Samsung device, add `LD_PRELOAD=/system/lib64/libskcodec.so `(space) before `pulseaudio ...` to fix some bug on One UI 6.

If you don't want `.lesshst`, add `export LESSHISTFILE=-` after `export HISTCONTROL=ignoreboth` in `/data/data/com.termux/files/usr/etc/bash.bashrc`.

If you don't want `.viminfo`, use `se vi=` in /data/data/com.termux/files/usr/share/vim/vimrc.

If you use tmux on st, try add
```
bind C-a send-prefix
set -g mode-keys vi
set -g prefix C-a
set -g status off
unbind C-b
```
into /data/data/com.termux/files/usr/etc/tmux.conf.

If you wanna use native Files app, try `adb shell am start com.google.android.documentsui/com.android.documentsui.files.FilesActivity`.

__NOTICE: If above meets your need, ignore the other part of this article.__


## Make Arch Linux on Surface Go 2

It is most recommended to try the easy-to-use Microsoft PowerToys on Windows 10
rather than drive into the hell of linux installation.


### PowerToys

- https://github.com/microsoft/PowerToys
- https://docs.microsoft.com/windows/powertoys

For example, remap shortcuts like UNIX readline with Keyboard Manager.
Default target app is all.

Shortcut     | Mapped To       | Target App
-------------|-----------------|-----------
Alt(Left) H  | Backspace       |
Alt(Left) I  | Tab             |
Alt(Left) J  | PgDn            |
Alt(Left) K  | PgUp            |
Alt(Left) L  | Shift End       |
Alt(Left) M  | Enter           |
Alt(Left) N  | Down            |
Alt(Left) P  | Up              |
Alt(Left) U  | Shift Home      |
Alt(Right) A | Home            |
Alt(Right) B | Left            |
Alt(Right) D | Delete          |
Alt(Right) E | End             |
Alt(Right) F | Right           |
Alt(Right) G | Esc             |
Alt(Right) W | Ctrl Shift Left |
Alt(Left) ,  | Browser Back    | msedge
Alt(Left) .  | Browser Forward | msedge

__NOTICE: If PowerToys meets your need, ignore the other part of this article.__

Registries to disable Windows Focus:  
`HKEY_CURRENT_USER/Software/Policies/Microsoft/Windows/Explorer/DisableNotifictaionCenter:dword:1`
`HKEY_LOCAL_MACHINE/SOFTWARE/Policies/Microsoft/Windows/Explorer/DisableNotificationCenter:dword:1`


### Linux Install

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

> Now's root@archiso, Make SGO2 arch bootable below

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

> Super user and web browser usable below

`vim /mnt/etc/pam.d/su` uncomment `auth sufficient pam_wheel.so trust use_uid`

`echo a>/mnt/etc/hostname`

`echo -e '127.0.0.1 localhost\n::1 localhost\n127.0.1.1 a.localdomain a'>/mnt/etc/hosts`

`echo -e '[General]\nEnableNetworkConfiguration=true\n[Network]\nNameResolvingService=systemd\n[Scan]\nDisablePeriodicScan=true'>/mnt/etc/iwd/main.conf`

`cd /tmp;curl -L github.com/aquajerry/dwm/archive/my.zip -odwm.zip;unzip dwm.zip;cd dwm-my;make;mv dwm /mnt/usr/local/bin`(require cc make unzip)

`cd /tmp;curl dl.suckless.org/st/st-`version`.tar.gz -ost.tar.gz;tar xf st.tar.gz;cd st-*;make;mv st /mnt/usr/local/bin`(require cc make pkgconf)

`echo exec dwm>/mnt/etc/X11/xinit/xinitrc`

> Right ctrl and power save below

`echo -e 'evdev:input:*\n KEYBOARD_KEY_70050=rightctrl\n KEYBOARD_KEY_700e3=left'>/mnt/etc/udev/hwdb.d/10-my-modifiers.hwdb`

`vim /mnt/etc/systemd/coredump.conf` set `Storage=none`, `ProcessSizeMax=0`

`vim /mnt/etc/systemd/journald.conf` set `Storage=none`

`echo -e 'kernel.dmesg_restrict=1\nkernel.nmi_watchdog=0\nvm.dirty_background_ratio=1\nvm.dirty_ratio=2\nvm.dirty_writeback_centisecs=6000'>/mnt/etc/sysctl.d/99-sysctl.conf`

```echo -e 'Section "Monitor"\n\tIdentifier "eDP-1"\n\t'`cvt 1152 768 30|tail -n1`'\n\tOption "PreferredMode" "1152x768_30.00"\nEndSection'>/mnt/etc/X11/xorg.conf.d/10-monitor.conf```

`echo -e 'w /sys/devices/system/cpu/cpufreq/policy?/energy_performance_preference - - - - power\nw /sys/devices/system/cpu/intel_pstate/no_turbo - - - - 1'>/mnt/etc/tmpfiles.d/power.conf`

`echo -e 'options iwlwifi power_save=1\noptions snd_hda_intel power_save=1'>/mnt/etc/modprobe.d/power.conf`

> Other below

`vim /mnt/usr/share/X11/xorg.conf.d/40-libinput.conf` in `Section "InputClass"` add `Option "NaturalScrolling" "on"`, `Option "Tapping" "on"`

`echo unset HISTFILE>/mnt/root/.bashrc`

`vim /mnt/etc/fonts/font.conf` in `<fontconfig>` add `<selectfont><rejectfont><glob>/usr/share/fonts/*otf</glob></rejectfont></selectfont>`

`vim /mnt/etc/fonts/conf.d/60-latin.conf` in `<alias>` of `<family>` `monospace` prepend `<family>Bitstream Vera Sans Mono</family>`

> Now's root@a

`arch-chroot /mnt`

`passwd -d root`

`useradd -mr -gwheel z`

`passwd -d z`

`^D`

> Now's root@archiso again

`echo unset HISTFILE>/mnt/home/z/.bashrc`

`echo exec startx>/mnt/home/z/.bash_profile`

`vim /mnt/etc/systemd/system/getty.target.wants/getty\@tty1.service` at `[Service]` `ExecStart` substitute `-o '-p -- \\u'` with `-az`

`reboot`

Disconnect SGO2 and USB

> SGO2 Arch below

Alt Shift Enter

`su` `echo 75 >/sys/class/backlight/intel_backlight/brightness`

`systemctl enable iwd systemd-resolved`

`systemctl start iwd systemd-resolved`

- [ ] unmute by `alsa-utils` package
- [ ] simplify firefox
- [ ] uim input method
