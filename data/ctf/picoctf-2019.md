---
title: picoCTF 2019
tags: [picoCTF, "2019"]
---

# Overview

https://2019game.picoctf.com/problems

# The Factory's Secret

#unsolved #1pt

> There appear to be some mysterious glyphs hidden inside this abandoned factory... I wonder what would happen if you collected them all?

# 2Warm

#general #50pt #bc

> Can you convert the number 42 (base 10) to binary (base 2)?
>
> picoCTF{101010}`

```bash
echo "obase=2;ibase=10;42;" | bc
```

# Glory of the Garden

#forensics #50pt #strings #grep

> This garden contains more than it seems. You can also find the file in /problems/glory-of-the-garden_4_cf9f4aaf458caf5268f8cf0a6465eb98 on the shell server.
>
> `picoCTF{more_than_m33ts_the_3y36BCA684D}`

No information in the image. Check the string contents.

```bash
strings garden.jpg | grep picoCTF{
```

# Insp3ct0r

#web-exploits #50pt #curl #grep

> Kishor Balan tipped us off that the following code may need inspection: https://2019shell1.picoctf.com/problem/61676/ (link) or http://2019shell1.picoctf.com:61676
>
> `picoCTF{tru3_d3t3ct1ve_0r_ju5t_lucky?1638dbe7}`

Study the web response using `curl` and note the clues and related CSS/JS file. `curl` and `grep` for relevant terms:

```bash
curl https://2019shell1.picoctf.com/problem/61676/
curl https://2019shell1.picoctf.com/problem/61676/ | grep picoCTF{
curl https://2019shell1.picoctf.com/problem/61676/mycss.css | grep flag
curl https://2019shell1.picoctf.com/problem/61676/myjs.js | grep flag
```

# Lets Warm Up

#general #50pt #ascii #bc

> If I told you a word started with 0x70 in hexadecimal, what would it start with in ASCII?
>
> `picoCTF{p}`

Hexadecimal is base 16. ASCII is base 128. Use `bc` to convert from base 16 to 128, and look up the decimal value in an ASCII table.

```bash
echo "obase=128;ibase=16;70" | bc  # decimal value '112'
man ascii  # lookup in ascii decimal table
```

# The Numbers

#cryptography #50pt #a1z26

> The numbers... what do they mean?
>
> `PICOCTF{THENUMBERSMASON}`

Visually obtain numbers in image: `16 9 3 15 3 20 6 { 20 8 5 14 21 13 2 5 18 19 13 1 19 15 14 }`

Quick observation that `3 -> C` and `9 -> I` implies a simple `a1z26` cipher.

```js
function decodeA1Z26(ciphertext, alphabet = "abcdefghijklmnopqrstuvwxyz") {
  const parts = ciphertext.split(" ");
  let plaintext = "";
  parts.forEach(part => {
    const letter = alphabet[parseInt(part) - 1];
    plaintext += letter || part;
  });
  return plaintext.toUpperCase();
}
```

# Warmed Up

#general #50pt #bc

> What is 0x3D (base 16) in decimal (base 10).
>
> `picoCTF{61}`

```bash
echo "obase=10;ibase=16;3D" | bc
```

# handy-shellcode

#unsolved #50pt

> This program executes any shellcode that you give it. Can you spawn a shell and use that to read the flag.txt? You can find the program in /problems/handy-shellcode_4_037bd47611d842b565cfa1f378bfd8d9 on the shell server. Source.

# practice-run-1

#binary-exploits #50pt

> You're going to need to know how to run programs if you're going to get out of here. Navigate to /problems/practice-run-1_0_62b61488e896645ebff9b6c97d0e775e on the shell server and run this program to receive a flag.
>
> `picoCTF{g3t_r3adY_2_r3v3r53}`

```bash
./run_this  # only in linux/unix
```

# unzip

#forensics #50pt #unzip

> Can you unzip this file and get the flag?
>
> `picoCTF{unz1pp1ng_1s_3a5y}`

```bash
unzip flag.zip
# open image file
```

# vault-door-training

#reverse-engineering #50pt

> Your mission is to enter Dr. Evil's laboratory and retrieve the blueprints for his Doomsday Project. The laboratory is protected by a series of locked vault doors. Each door is controlled by a computer and requires a password to open. Unfortunately, our undercover agents have not been able to obtain the secret passwords for the vault doors, but one of our junior agents obtained the source code for each vault's computer! You will need to read the source code for each level to figure out what the password is for that vault door. As a warmup, we have created a replica vault in our training facility. The source code for the training vault is here: VaultDoorTraining.java
>
> `picoCTF{w4rm1ng_Up_w1tH_jAv4_e57d01a632a}`

Read the source code to obtain the password.

# 13

#cryptography #100pt #rot13

> Cryptography can be easy, do you know what ROT13 is? `cvpbPGS{abg_gbb_onq_bs_n_ceboyrz}`
>
> `picoCTF{not_too_bad_of_a_problem}`

```js
function decodeCaesar(
  ciphertext,
  alphabets = "abcdefghijklmnopqrstuvwxyz",
  shift = 13
) {
  let plaintext = "";
  for (let i = 0; i < ciphertext.length; i++) {
    const cipherChar = ciphertext[i];
    const cipherIndex = alphabets.indexOf(cipherChar);
    let plainIndex = -1;
    if (cipherIndex >= 0) {
      plainIndex = (cipherIndex + shift) % alphabets.length;
    }
    plaintext += plainIndex >= 0 ? alphabets[plainIndex] : cipherChar;
  }
  return plaintext;
}
```

# Bases

#general #100pt #openssl #base64

> What does this `bDNhcm5fdGgzX3IwcDM1` mean? I think it has something to do with bases.
>
> `picoCTF{l3arn_th3_r0p35}`

Try decoding base-64 with `openssl`

```bash
echo "bDNhcm5fdGgzX3IwcDM1" | openssl base64 -d
```

# Easy1

#cryptography #one-time-pad

> The one time pad can be cryptographically secure, but not when you know the key. Can you solve this? We've given you the encrypted flag, key, and a table to help `UFJKXQZQUNB` with the key of `SOLVECRYPTO`. Can you use this table to solve it?.
>
> `picoCTF{CRYPTOISFUN}`

Read https://en.wikipedia.org/wiki/One-time_pad and use the table to decrypt by finding the plaintext characters via the row (key) by column (ciphertext) intersection.

```
    A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
   +----------------------------------------------------
A | A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
B | B C D E F G H I J K L M N O P Q R S T U V W X Y Z A
C | C D E F G H I J K L M N O P Q R S T U V W X Y Z A B
D | D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
E | E F G H I J K L M N O P Q R S T U V W X Y Z A B C D
F | F G H I J K L M N O P Q R S T U V W X Y Z A B C D E
G | G H I J K L M N O P Q R S T U V W X Y Z A B C D E F
H | H I J K L M N O P Q R S T U V W X Y Z A B C D E F G
I | I J K L M N O P Q R S T U V W X Y Z A B C D E F G H
J | J K L M N O P Q R S T U V W X Y Z A B C D E F G H I
K | K L M N O P Q R S T U V W X Y Z A B C D E F G H I J
L | L M N O P Q R S T U V W X Y Z A B C D E F G H I J K
M | M N O P Q R S T U V W X Y Z A B C D E F G H I J K L
N | N O P Q R S T U V W X Y Z A B C D E F G H I J K L M
O | O P Q R S T U V W X Y Z A B C D E F G H I J K L M N
P | P Q R S T U V W X Y Z A B C D E F G H I J K L M N O
Q | Q R S T U V W X Y Z A B C D E F G H I J K L M N O P
R | R S T U V W X Y Z A B C D E F G H I J K L M N O P Q
S | S T U V W X Y Z A B C D E F G H I J K L M N O P Q R
T | T U V W X Y Z A B C D E F G H I J K L M N O P Q R S
U | U V W X Y Z A B C D E F G H I J K L M N O P Q R S T
V | V W X Y Z A B C D E F G H I J K L M N O P Q R S T U
W | W X Y Z A B C D E F G H I J K L M N O P Q R S T U V
X | X Y Z A B C D E F G H I J K L M N O P Q R S T U V W
Y | Y Z A B C D E F G H I J K L M N O P Q R S T U V W X
Z | Z A B C D E F G H I J K L M N O P Q R S T U V W X Y
```

# First Grep

#general #100pt #grep

> Can you find the flag in file? This would be really tedious to look through manually, something tells me there is a better way. You can also find the file in /problems/first-grep_0_93be1631acf1a93b98cdcc3e7b9fdc52 on the shell server.
>
> `picoCTF{grep_is_good_to_find_things_4b2451ea}`

```bash
grep picoCTF{ file
```

# Overflow 0

#unsolved #100pt

> This should be easy. Overflow the correct buffer in this program and get a flag. Its also found in /problems/overflow-0_4_e130f4df1710865981d50f778a8059f7 on the shell server. Source.

# Resources

#general #100pt #grep

> We put together a bunch of resources to help you out on our website! If you go over there, you might even find a flag! https://picoctf.com/resources (link)
>
> `picoCTF{r3source_pag3_f1ag}`

```bash
curl https://picoctf.com/resources | grep picoCTF{
```

# caesar

#cryptography #100pt #caesar-cipher #brute-force

> Decrypt this message (`picoCTF{jyvzzpunaolybipjvunfzpthre}`). You can find the ciphertext in /problems/caesar_0_22aa542fadadcc37b6ec6037c493ec9f on the shell server.
>
> `picoCTF{crossingtherubicongysimakx}`

Use the `decodeCaesar` method in the earlier problems.

```js
function decrypt(ciphertext) {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < alphabets.length; i++) {
    console.log(decodeCaesar(ciphertext, alphabets, i));
  }
}
```

# dont-use-client-side

#web-exploits #100pt #curl

> Can you break into this super secure portal? https://2019shell1.picoctf.com/problem/12280/ (link) or http://2019shell1.picoctf.com:12280
>
> `picoCTF{no_clients_plz_577431}`

```bash
curl https://2019shell1.picoctf.com/problem/12280/
# study code
```

# logon

#web-exploits #100pt #cookies

> The factory is hiding things from all of its users. Can you login as logon and find what they've been looking at? https://2019shell1.picoctf.com/problem/49907/ (link) or http://2019shell1.picoctf.co
>
> `picoCTF{th3_c0nsp1r4cy_l1v3s_9e21365b}`

Open link in browser, click login.
Successfully logged in, but not allowed to see flag.
Check HTML/JS/CSS, no clues except the message:

```
This file intentionally left blank.

No really, this is not part of a problem, your browser probably loaded this by mistake.
```

Check cookies: `password=; username=; admin=False`

Since `password` and `username` don't affect the page, resend the page request by setting `admin=True` in the cookie.

# vault-door-1

#reverse-engineering #100pt

> This vault uses some complicated arrays! I hope you can make sense of it, special agent. The source code for this vault is here: VaultDoor1.java
>
> `picoCTF{d35cr4mbl3_tH3_cH4r4cT3r5_51e7fd}`

Read and reverse-engineer the code.

# what's a net cat?

#general-skills #100pt #nc

> Using netcat (nc) is going to be pretty important. Can you connect to 2019shell1.picoctf.com at port 4158 to get the flag?
>
> `picoCTF{nEtCat_Mast3ry_700da9c7}`

```bash
nc 2019shell1.picoctf.com 4158
```

# where are the robots

#web-exploits #100pt #robots #curl #grep

> Can you find the robots? https://2019shell1.picoctf.com/problem/4159/ (link) or http://2019shell1.picoctf.com:
>
> `picoCTF{ca1cu1at1ng_Mach1n3s_a44f7}`

Use the hint to arrive to `robots.txt` via https://en.wikipedia.org/wiki/Robots_exclusion_standard.

```bash
curl https://2019shell1.picoctf.com/problem/4159/robots.txt # see disallowed pages
curl https://2019shell1.picoctf.com/problem/4159/a44f7.html
curl https://2019shell1.picoctf.com/problem/4159/a44f7.html | grep picoCTF{
```

# So Meta

#forensics #150pt #strings #grep

> Find the flag in this picture. You can also find the file in /problems/so-meta_6_8d7541b8d04bd65a01336fdb8db6db24
>
> `picoCTF{s0_m3ta_505fdd8b}`

```bash
strings pico_img.png | grep picoCTF{
```

# What Lies Within

#unsolved #150pt

> Theres something in the building. Can you retrieve the flag?
>
> ``

```bash

```

# extensions

#forensics #150pt #file

> This is a really weird text file TXT? Can you find the flag?
>
> ``

```bash
file flag.txt
mv flag.txt flag.png  # open image file for flag
```

# shark on wire 1

#unsolved #forensics #150pt

> We found this packet capture. Recover the flag. You can also find the file in /problems/shark-on-wire-1_0_13d709ec13952807e477ba1b5404e620.
>
> ``

```bash

```

# Based

#general #200pt #ascii

> To get truly 1337, you must understand different data encodings, such as hexadecimal or binary. Can you get the flag from this program to prove you are on the way to becoming 1337? Connect with nc 2019shell1.picoctf.com 31615.
>
> `picoCTF{learning_about_converting_values_502ff297}`

Use the following python script to solve the problem for bases 2, 8, 16.

```python
def getWord(input, base):
  chars = [chr(int(char, base)) for char in input.split(' ')]
  return ''.join(chars)
```

# Client-side-again

> Can you break into this super secure portal? https://2019shell1.picoctf.com/problem/47277/ (link) or http://2019shell1.picoctf.com:47277
>
> ``

#web-exploits #200pt #unsolved
