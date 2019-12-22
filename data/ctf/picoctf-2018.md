---
title: picoCTF 2018
tags: [picoCTF, "2018"]
---

# Overview

https://2018game.picoctf.com/problems solved in `bash` and `js`.

# Forensics Warmup 1

#forensics #50pt #unzip

> Can you unzip this file for me and retreive the flag?
>
> `picoCTF{welcome_to_forensics}`

```bash
unzip flag.zip
# get flag in image
```

# Forensics Warmup 2

#forensics #50pt

> Hmm for some reason I can't open this PNG? Any ideas?
>
> `picoCTF{extensions_are_a_lie}`

```bash
file flag.png
mv flag.png flag.jpeg
# get flag in image
```

# General Warmup 1

#general #50pt #bc #ascii

> If I told you your grade was `0x41` in hexadecimal, what would it be in ASCII?
>
> `picoCTF{A}`

```bash
echo "41" | xxd -r -p
```

# General Warmup 2

#general #50pt #bases

> Can you convert the number 27 (base 10) to binary (base 2)?
>
> `picoCTF{11011}`

```bash
echo "obase=2; ibase=10; 27" | bc
```

# General Warmup 3

#general #50pt #bases

> What is `0x3D` (base 16) in decimal (base 10).
>
> `picoCTF{61}`

```bash
echo "obase=10; ibase=16; 3D" | bc
```

# Resources

#general

> We put together a bunch of resources to help you out on our website! If you go over there, you might even find a flag! https://picoctf.com/resources (link)
>
> `picoCTF{xiexie_ni_lai_zheli}`

# Reversing Warmup 1

#reversing #50pt

> Throughout your journey you will have to run many programs. Can you navigate to `/problems/reversing-warmup-1_0_f99f89de33522c93964bdec49fb2b838` on the shell server and run this program to retreive the flag?
>
> `picoCTF{welc0m3_t0_r3VeRs1nG}`

Simply run `./run` in the shell server

# Reversing Warmup 2

#reversing #50pt #ascii

> Can you decode the following string `dGg0dF93NHNfczFtcEwz` from base64 format to ASCII?
>
> `picoCTF{th4t_w4s_s1mpL3}`

```bash
echo "dGg0dF93NHNfczFtcEwz" | base64 -D
```

# Crypto Warmup 1

#cryptography #75pt

> Crpyto can often be done by hand, here's a message you got from a friend, `llkjmlmpadkkc` with the key of `thisisalilkey`. Can you use this table to solve it?.
>
> ``
