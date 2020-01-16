---
title: picoCTF 2019
tags: [picoCTF, "2019"]
---

## Overview

https://2019game.picoctf.com/problems solved in `bash` and `js`.

## The Factory's Secret

#general #unsolved #1pt

> There appear to be some mysterious glyphs hidden inside this abandoned factory... I wonder what would happen if you collected them all?

## 2Warm

#general #50pt #bases #bc

> Can you convert the number 42 (base 10) to binary (base 2)?
>
> `picoCTF{101010}`

```bash
echo "obase=2; ibase=10; 42" | bc
```

## Glory of the Garden

#forensics #50pt #strings #grep

> This garden contains more than it seems. You can also find the file in `/problems/glory-of-the-garden_4_cf9f4aaf458caf5268f8cf0a6465eb98` on the shell server.
>
> `picoCTF{more_than_m33ts_the_3y36BCA684D}`

No information in the image. Check the string contents.

```bash
strings garden.jpg | grep picoCTF{
```

## Insp3ct0r

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

## Lets Warm Up

#general #50pt #bases #ascii

> If I told you a word started with `0x70` in hexadecimal, what would it start with in ASCII?
>
> `picoCTF{p}`

Use `xxd` with `-r` to get the reverse of the hex representation

```bash
echo "70" | xxd -r -p
```

## The Numbers

#cryptography #50pt #a1z26

> The numbers... what do they mean?
>
> `PICOCTF{THENUMBERSMASON}`

Visually obtain numbers in image: `16 9 3 15 3 20 6 { 20 8 5 14 21 13 2 5 18 19 13 1 19 15 14 }`

Quick observation (`3: C` and `9: I`) suggests a simple `a1z26` cipher.

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

## Warmed Up

#general #50pt #bases #bc

> What is `0x3D` (base 16) in decimal (base 10).
>
> `picoCTF{61}`

```bash
echo "obase=10; ibase=16; 3D" | bc
```

## handy-shellcode

#binary-exploits #unsolved #50pt

> This program executes any shellcode that you give it. Can you spawn a shell and use that to read the flag.txt? You can find the program in `/problems/handy-shellcode_4_037bd47611d842b565cfa1f378bfd8d9` on the shell server. Source.

## practice-run-1

#binary-exploits #50pt

> You're going to need to know how to run programs if you're going to get out of here. Navigate to `/problems/practice-run-1_0_62b61488e896645ebff9b6c97d0e775e` on the shell server and run this program to receive a flag.
>
> `picoCTF{g3t_r3adY_2_r3v3r53}`

Simply download and execute with:

```bash
./run_this
```

## unzip

#forensics #50pt #unzip

> Can you unzip this file and get the flag?
>
> `picoCTF{unz1pp1ng_1s_3a5y}`

```bash
unzip flag.zip
# open image file
```

## vault-door-training

#reverse-engineering #50pt

> Your mission is to enter Dr. Evil's laboratory and retrieve the blueprints for his Doomsday Project. The laboratory is protected by a series of locked vault doors. Each door is controlled by a computer and requires a password to open. Unfortunately, our undercover agents have not been able to obtain the secret passwords for the vault doors, but one of our junior agents obtained the source code for each vault's computer! You will need to read the source code for each level to figure out what the password is for that vault door. As a warmup, we have created a replica vault in our training facility. The source code for the training vault is here: VaultDoorTraining.java
>
> `picoCTF{w4rm1ng_Up_w1tH_jAv4_e57d01a632a}`

Read the source code to obtain the password.

## 13

#cryptography #100pt #rot13

> Cryptography can be easy, do you know what ROT13 is? `cvpbPGS{abg_gbb_onq_bs_n_ceboyrz}`
>
> `picoCTF{not_too_bad_of_a_problem}`

Read https://en.wikipedia.org/wiki/ROT13

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

## Bases

#general #100pt #base64

> What does this `bDNhcm5fdGgzX3IwcDM1` mean? I think it has something to do with bases.
>
> `picoCTF{l3arn_th3_r0p35}`

Looks like a base64-encoded string. Decode it with:

```bash
echo "bDNhcm5fdGgzX3IwcDM1" | base64 -D
```

## Easy1

#cryptography #vigenere-cipher

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

## First Grep

#general #100pt #grep

> Can you find the flag in file? This would be really tedious to look through manually, something tells me there is a better way. You can also find the file in `/problems/first-grep_0_93be1631acf1a93b98cdcc3e7b9fdc52` on the shell server.
>
> `picoCTF{grep_is_good_to_find_things_4b2451ea}`

```bash
grep picoCTF{ file
```

## Overflow 0

#binary-exploits #unsolved #100pt

> This should be easy. Overflow the correct buffer in this program and get a flag. Its also found in `/problems/overflow-0_4_e130f4df1710865981d50f778a8059f7` on the shell server. Source.

## Resources

#general #100pt #grep

> We put together a bunch of resources to help you out on our website! If you go over there, you might even find a flag! https://picoctf.com/resources (link)
>
> `picoCTF{r3source_pag3_f1ag}`

```bash
curl https://picoctf.com/resources | grep picoCTF{
```

## caesar

#cryptography #100pt #caesar-cipher #brute-force

> Decrypt this message (`picoCTF{jyvzzpunaolybipjvunfzpthre}`). You can find the ciphertext in `/problems/caesar_0_22aa542fadadcc37b6ec6037c493ec9f` on the shell server.
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

## dont-use-client-side

#web-exploits #100pt #curl

> Can you break into this super secure portal? https://2019shell1.picoctf.com/problem/12280/ (link) or http://2019shell1.picoctf.com:12280
>
> `picoCTF{no_clients_plz_577431}`

Study the javascript code and repiece/reorder the flag.

```bash
curl https://2019shell1.picoctf.com/problem/12280/
```

## logon

#web-exploits #100pt #postman

> The factory is hiding things from all of its users. Can you login as logon and find what they've been looking at? https://2019shell1.picoctf.com/problem/49907/ (link) or http://2019shell1.picoctf.co
>
> `picoCTF{th3_c0nsp1r4cy_l1v3s_9e21365b}`

- Study the webpage with `curl`.
- Nothing interesting in the HTML/JS/CSS except making a `POST` request using the form (check the `action` and form fields)
- Use Postman to make a `POST /login` with request body (form-data): `user:user` and `password:pwd`.
- We get a response that suggests redirecting us to the route `/flag`.
- Check the response headers and cookies and we notice that `admin:false` is set by default from the server.
- Navigate to the `GET /flag` endpoint and receive a clue that we logged in but cannot view the flag.
- With the earlier knowledge about the server-set default cookie value for `admin`, change this in the request headers and resend the `GET /flag` request.

## strings it

#general #100pt #strings #grep

> Can you find the flag in file without running it? You can also find the file in `/problems/strings-it_3_8386a6aa560aecfba03c0c6a550b5c51` on the shell server.
>
> `picoCTF{5tRIng5_1T_c7fff9e5}`

```bash
strings strings | grep picoCTF{
```

## vault-door-1

#reverse-engineering #100pt

> This vault uses some complicated arrays! I hope you can make sense of it, special agent. The source code for this vault is here: VaultDoor1.java
>
> `picoCTF{d35cr4mbl3_tH3_cH4r4cT3r5_51e7fd}`

Read and reverse-engineer the code.

## what's a net cat?

#general-skills #100pt #nc

> Using `netcat` (`nc`) is going to be pretty important. Can you connect to `2019shell1.picoctf.com` at port `4158` to get the flag?
>
> `picoCTF{nEtCat_Mast3ry_700da9c7}`

```bash
nc 2019shell1.picoctf.com 4158
```

## where are the robots

#web-exploits #100pt #robots #curl #grep

> Can you find the robots? https://2019shell1.picoctf.com/problem/4159/ (link) or http://2019shell1.picoctf.com:
>
> `picoCTF{ca1cu1at1ng_Mach1n3s_a44f7}`

Use the hint to arrive to `robots.txt` via https://en.wikipedia.org/wiki/Robots_exclusion_standard.

```bash
curl https://2019shell1.picoctf.com/problem/4159/
curl https://2019shell1.picoctf.com/problem/4159/robots.txt # see disallowed pages
curl https://2019shell1.picoctf.com/problem/4159/a44f7.html
curl https://2019shell1.picoctf.com/problem/4159/a44f7.html | grep picoCTF{
```

## So Meta

#forensics #150pt #strings #grep

> Find the flag in this picture. You can also find the file in `/problems/so-meta_6_8d7541b8d04bd65a01336fdb8db6db24`
>
> `picoCTF{s0_m3ta_505fdd8b}`

Image provides no visual clues, check the file content with `strings` and `grep`.

```bash
strings pico_img.png | grep picoCTF{
```

## What Lies Within

#forensics #unsolved #150pt

> Theres something in the building. Can you retrieve the flag?
>
> ``

```bash

```

## extensions

#forensics #150pt #file

> This is a really weird text file TXT? Can you find the flag?
>
> `picoCTF{now_you_know_about_extensions}`

```bash
file flag.txt
mv flag.txt flag.png  # open image file for flag
```

## shark on wire 1

#forensics #unsolved #forensics #150pt

> We found this packet capture. Recover the flag. You can also find the file in `/problems/shark-on-wire-1_0_13d709ec13952807e477ba1b5404e620`.
>
> ``

```bash

```

## Based

#general #200pt #ascii

> To get truly 1337, you must understand different data encodings, such as hexadecimal or binary. Can you get the flag from this program to prove you are on the way to becoming 1337? Connect with `nc 2019shell1.picoctf.com 31615`.
>
> `picoCTF{learning_about_converting_values_502ff297}`

Use the following script to solve the problem for bases 2, 8, 16.

```js
function getAsciiString(input, base) {
  return input
    .split(" ")
    .map(char => String.fromCharCode(parseInt(char, base)))
    .join("");
}
```

## Client-side-again

> Can you break into this super secure portal? https://2019shell1.picoctf.com/problem/47277/ (link) or http://2019shell1.picoctf.com:47277
>
> `picoCTF{not_this_again_d29871}`

#web-exploits #200pt #obfuscation

Get source code and de-obfuscate code by:

- Replacing `0x*` numbers with actual numbers.
- Rename variables (e.g. `getValue`).
- Compute variables that depend on `split`.
- Replace `getValue(i)` with the actual value in `data` retrieved (note that `data` array has been sorted).
- Reverse-engineer the flag in the nested `if` conditions.

```js
// de-obfuscated code
var data = [
  "29871}",
  "_again_d",
  "this",
  "Password\x20Verified",
  "Incorrect\x20password",
  "getElementById",
  "value",
  "substring",
  "picoCTF{",
  "not_this"
];
(function(dataArr, i) {
  var callback = function(j) {
    while (--j) {
      dataArr["push"](dataArr["shift"]());
    }
  };
  callback(++i);
})(data, 435);
var getValue = function(index) {
  index = index - 0;
  var result = data[index];
  return result;
};
// data = ["getElementById","value","substring","picoCTF{","not_this","29871}","_again_d","this","Password Verified","Incorrect password"]
function verify() {
  checkpass = document.getElementById("pass").value;
  if (checkpass.substring(0, 8) == "picoCTF{") {
    if (checkpass.substring(7, 9) == "{n") {
      if (checkpass.substring(8, 16) == "not_this") {
        if (checkpass.substring(3, 6) == "oCT") {
          if (checkpass.substring(24, 32) == "29871}") {
            if (checkpass.substring(6, 11) == "F{not") {
              if (checkpass.substring(16, 24) == "_again_d") {
                if (checkpass.substring(12, 16) == "this") {
                  alert("Password Verified");
                  // picoCTF{not_this_again_d29871}
                }
              }
            }
          }
        }
      }
    }
  } else {
    alert(getValue("Incorrect password"));
  }
}
```

## First Grep: Part II

#general #200pt #grep

> Can you find the flag in `/problems/first-grep--part-ii_6_84224d7d745e41d24bde7e7bc7062bbe/files` on the shell server? Remember to use `grep`.
>
> `picoCTF{grep_r_to_find_this_5241c61f}`

```bash
grep -r picoCTF{ .
```

## Flags

#cryptography #200pt

> What do the flags mean?
>
> `PICOCTF{F1AG5AND5TUFF}`

The image looks like a character mapping of visual flags to text characters. One such mapping exists: https://www.dcode.fr/maritime-signals-code.

## Mr-Worldwide

#cryptography #200pt

> A musician left us a message. What's it mean?
>
> `picoCTF{KODIAK_ALASKA}`

The clue is in the name of the problem (i.e. `worldwide`). Take the first letters of cities (`KODIAK`) and first letters of regions `ALASKA`).

## Open-to-admins

#web-exploits #200pt #postman

> This secure website allows users to access the flag only if they are admin and if the time is exactly 1400. https://2019shell1.picoctf.com/problem/49858/ (link) or http://2019shell1.picoctf.com:49858
>
> `picoCTF{0p3n_t0_adm1n5_effb525e}`

- Check that there's nothing interesting in the HTML/CSS/JS with `curl`.
- There is a link that links to `/flag`.
- In Postman make a `GET /flag` request and we are informed we are not an admin nor the correct time.
- Set `admin=True;time=1400` from the problem description.
- `GET /flag` now gives the flag.

## Tapping

#cryptography #200pt #morsecode

> Theres tapping coming in from the wires. What's it saying `nc 2019shell1.picoctf.com 45168`
>
> `PICOCTF{M0RS3C0D31SFUN348887105}`

Run the `nc` on CLI and it looks like Morse code. Decode it with:

```js
function decodeMorseCode(ciphertext) {
  const alphabets = {
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
    "/": " ",
    "-·-·--": "!",
    "·-·-·-": ".",
    "--··--": ","
  };
  return ciphertext
    .split(" ")
    .map(char => (alphabets[char] ? alphabets[char] : char))
    .join("")
    .toUpperCase();
}
```

## la cifra de

#cryptography #200pt #vigenere-cipher

> I found this cipher in an old book. Can you figure out what it says? Connect with `nc 2019shell1.picoctf.com 37608`.
>
> `picoCTF{b311a50_0r_v1gn3r3_c1ph3re62e044a}`

Connect with `nc` and see that we have to decode `hgqqpohzCZK{m311a50_0x_a1rn3x3_h1ah3xj62p044a}`

The ciphertext seems to preserve the character size of each word, suggesting a Vigenere cipher. Use an online tool https://www.guballa.de/vigenere-solver as suggested by the hint to crack this and capture the flag.

## picobrowser

#web-exploits #200pt #postman

> This website can be rendered only by `picobrowser`, go and catch the flag! https://2019shell1.picoctf.com/problem/21851/ (link) or http://2019shell1.picoctf.com:2185
>
> `picoCTF{p1c0_s3cr3t_ag3nt_3e1c0ea2}`

- Use Postman to make a `GET` request.
- Study the HTML and see that there is a link to `/flag`.
- Use Postman and make a request to `GET /flag`.
- The webpage response suggests that we are `PostmanRuntime/7.20.1` and not `picobrowser`.
- Study the request headers and notice that `User-Agent` should be changed from `PostmanRuntime/7.20.1` to `picobrowser`.
- Resend the `GET /flag` request.

## plumbing

#general #200pt #nc #grep

> Sometimes you need to handle process data outside of a file. Can you find a way to keep the output from this program and search for the flag? Connect to `2019shell1.picoctf.com 63345`
>
> `picoCTF{digital_plumb3r_4e7a5813}`

As suggested, we should probably pipe this through `grep`

```bash
nc 2019shell1.picoctf.com 63345 | grep picoCTF{
```

## rsa-pop-quiz

#cryptography #unsolved #200pt

> Class, take your seats! It's PRIME-time for a quiz... `nc 2019shell1.picoctf.com 53028`
>
> ``

Learn how RSA works on https://simple.wikipedia.org/wiki/RSA_algorithm.
Have the following scripts and a [prime checker](https://primes.utm.edu/curios/includes/primetest.php) handy:

```python
# scripts are done in Python to handle larger numbers
def n(p, q):
  return p * q

def q(n, p):
  return n / p

def t(p, q):
  return (p - 1) * (q - 1)

def c(m, e, n):
  return pow(m, e, n)
```

- Problem 1:
  - `Y`: Both `p`, `q` are primes.
  - `n(76753, 60413) = 4636878989`
- Problem 2:
  - `Y`: Both `p` `n/p` are primes.
  - `q(5051846941, 54269) = 93089`
- Problem 3:
  - `N`: `n` is divisble by `e`.
- Problem 4:
  - `Y`: Both `p`, `q` are primes.
  - `t(12611, 66347) = 836623060`
- Problem 5:
  - `Y`: `m` is smaller than `n`.
  - `c(6357294171489311547190987615544575133581967886499484091352661406414044440475205342882841236357665973431462491355089413710392273380203038793241564304774271529108729717, 3, 29129463609326322559521123136222078780585451208149138547799121083622333250646678767769126248182207478527881025116332742616201890576280859777513414460842754045651093593251726785499360828237897586278068419875517543013545369871704159718105354690802726645710699029936754265654381929650494383622583174075805797766685192325859982797796060391271817578087472948205626257717479858369754502615173773514087437504532994142632207906501079835037052797306690891600559321673928943158514646572885986881016569647357891598545880304236145548059520898133142087545369179876065657214225826997676844000054327141666320553082128424707948750331) = 256931246631782714357241556582441991993437399854161372646318659020994329843524306570818293602492485385337029697819837182169818816821461486018802894936801257629375428544752970630870631166355711254848465862207765051226282541748174535990314552471546936536330397892907207943448897073772015986097770443616540466471245438117157152783246654401668267323136450122287983612851171545784168132230208726238881861407976917850248110805724300421712827401063963117423718797887144760360749619552577176382615108244813`
- Problem 6:
  - `N`: Not possible to produce plaintext `m` with just information on the ciphertext `c` and public key (`n`, `e`).
- Problem 7:
  - `Y`: `q` and `p` are primes.
  - Unsolved
- Problem 8:
  - Unsolved

## vault-door-3

#reverse-engineering #unsolved #200pt

> This vault uses for-loops and byte arrays. The source code for this vault is here: VaultDoor3.java
>
> ``

## whats-the-difference

#general #200pt #cmp #awk #tr #ascii

> Can you spot the difference? kitters cattos. They are also available at `/problems/whats-the-difference_0_00862749a2aeb45993f36cc9cf98a47a on the shell server`
>
> `picoCTF{th3yr3_a5_d1ff3r3nt_4s_bu773r_4nd_j311y_aslkjfdsalkfslkflkjdsfdszmz10548}`

Compare the two files using `cmp`. Note that the third column looks like ASCII codes. Use the `getAsciiString` method in earlier problems to get the flag.

```bash
cmp kitters.jpg cattos.jpg -l
cmp kitters.jpg cattos.jpg -l | awk '{print $3}' | tr '\n' ' '
```

## where-is-the-file

#general #200pt

> I've used a super secret mind trick to hide this file. Maybe something lies in `/problems/where-is-the-file_3_19c1a7766ac2747c446eb9666a9b4fb4`.
>
> ``

## WhitePages

#forensics #250pt #xxd #awk #sed #ascii

> I stopped using YellowPages and moved onto WhitePages... but the page they gave me is all blank!
>
> `picoCTF{not_all_spaces_are_created_equal_c167040c738e8bcae2109ef4be5960b1}`

```bash
file whitepages.txt  # non-empty
xxd whitepages.txt  # only white-space characters 20 and e28083, try representing these as binary
xxd whitepages.txt | awk '{printf $2$3$4$5$6$7$8$9}' | sed s/e28083/1/g | sed s/20/0/g  # first possible binary string (bstring1)
xxd whitepages.txt | awk '{printf $2$3$4$5$6$7$8$9}' | sed s/e28083/0/g | sed s/20/1/g  # second possible binary string (bstring2)
```

We should group the binary string by bits. Let's use a general delimitate function below and call the `getAsciiString` method in earlier problems

```js
function delimitate(input, width = 8, delimiter = " ") {
  let result = "";
  for (let i = 0; i < input.length; i++) {
    if (i > 0 && i % width == 0) {
      result += delimiter;
    }
    result += input[i];
  }
  return result;
}

getAsciiString(delimitate(bstring1), 2); // gibberish
getAsciiString(delimitate(bstring2), 2); // the flag shows up!
```

## c0rrupt

#forensics #unsolved #250pt

> We found this file. Recover the flag. You can also find the file in `/problems/c0rrupt_0_1fcad1344c25a122a00721e4af86de13`.
>
> ``

## like1000

#forensics #250pt #tar

> This .tar file got tarred alot. Also available at `/problems/like1000_0_369bbdba2af17750ddf10cc415672f1c`.
>
> `picoCTF{l0t5_0f_TAR5}`

Scripting this in Python is easier than JS using the `tarfile` module.

```python
import tarfile

def untar(tar_file):
    tf = tarfile.open(tar_file)
    tf.extractall()


def run():
    """Untars a tarfile recursively"""
    tar_count = 1000
    while tar_count > 0:
        tar_file = './{}.tar'.format(tar_count)
        print('Untarring file {}...'.format(tar_file))
        untar(tar_file)
        tar_count -= 1

run()
```

## m00nwalk

#forensics #unsolved #250pt

> Decode this message from the moon. You can also find the file in `/problems/m00nwalk_5_72c1b4e13cc7ddd43d7fb3b0ae86afef`.
>
> ``

Read about the WAV/RIFF format: https://www.isip.piconepress.com/projects/speech/software/tutorials/production/fundamentals/v1.0/section_02/s02_01_p05.html

We are interested in the data of the file. Use `xxd` and seek to `45` to obtain the data.

```bash
xxd -s 45 message.wav > data
```

## Irish-Name-Repo 1

#web-exploits #300pt #sql-injection

> There is a website running at https://2019shell1.picoctf.com/problem/37868/ (link) or http://2019shell1.picoctf.com:37868. Do you think you can log us in? Try to see if you can login!
>
> `picoCTF{s0m3_SQL_a57b0b1d}`

The website does not provide anything useful aside from a hint in the `/support` page where someone complains about a `SQL Error`. Together with the problem hint, let's try the simple SQL injections:

- `'--`: Nothing happens, which means the filter conditions are applied before the injection.
- `'OR 1=1--`: We successfully logged in :)

## waves over lambda

#cryptography #300pt #frequency-analysis #grep #sed

> We made alot of substitutions to encrypt this. Can you decrypt it? Connect with `nc 2019shell1.picoctf.com 45185`
>
> `picoCTF{frequency_is_c_over_lambda_mupgpennod}`

Store a persisted file to decrypt via `nc 2019shell1.picoctf.com 45185 > substitutions.txt`

```txt
hfigffb sl ijfvf gul, ul o juef uqvfuwn luow lcdfgjfvf, ijf hcbw cx ijf lfu. hflowfl jcqwobt csv jfuvil ictfijfv ijvcstj qcbt yfvocwl cx lfyuvuiocb, oi juw ijf fxxfpi cx duaobt sl icqfvubi cx fupj cijfv'l nuvblubw fefb pcbeopiocbl. ijf qugnfvijf hfli cx cqw xfqqcgljuw, hfpuslf cx jol dubn nfuvl ubw dubn eovisfl, ijf cbqn psljocb cb wfpa, ubw gul qnobt cb ijf cbqn vst. ijf uppcsbiubi juw hvcstji csi uqvfuwn u hcm cx wcdobcfl, ubw gul icnobt uvpjoifpisvuqqn goij ijf hcbfl. duvqcg lui pvcll-qfttfw votji uxi, qfubobt utuobli ijf dokkfb-duli. jf juw lsbafb pjffal, u nfqqcg pcdyqfmocb, u livuotji hupa, ub ulpfiop ulyfpi, ubw, goij jol uvdl wvcyyfw, ijf yuqdl cx jubwl csiguvwl, vflfdhqfw ub owcq. ijf wovfpicv, luiolxofw ijf ubpjcv juw tccw jcqw, duwf jol gun uxi ubw lui wcgb udcbtli sl. gf fmpjubtfw u xfg gcvwl qukoqn. uxifvguvwl ijfvf gul loqfbpf cb hcuvw ijf nupji. xcv lcdf vfulcb cv cijfv gf wow bci hftob ijui tudf cx wcdobcfl. gf xfqi dfwoiuioef, ubw xoi xcv bcijobt hsi yqupow liuvobt. ijf wun gul fbwobt ob u lfvfboin cx lioqq ubw fmzsoloif hvoqqoubpf. ijf guifv ljcbf yupoxopuqqn; ijf lan, goijcsi u lyfpa, gul u hfbotb oddfbloin cx sbliuobfw qotji; ijf efvn doli cb ijf fllfm duvlj gul qoaf u tuskn ubw vuwoubi xuhvop, jsbt xvcd ijf gccwfw volfl obqubw, ubw wvuyobt ijf qcg ljcvfl ob wouyjubcsl xcqwl. cbqn ijf tqccd ic ijf gfli, hvccwobt cefv ijf syyfv vfupjfl, hfpudf dcvf lcdhvf fefvn dobsif, ul ox ubtfvfw hn ijf uyyvcupj cx ijf lsb.
```

Use `cat` and `grep` to visually observe the file, apply frequencies based on the analyzer results, and make relevant substitutions with `sed`:

- `ijf -> THE`
- `v -> R`: exists in `THEvE` and `THv` cannot be `TH[sm]`
- `c -> O`: exists in `Tc` and is a valid first character to many digraphs `c*`
- `e -> V`: exists in `OeER`
- `x -> F`: exists in many `Ox` occurrences
- `o -> I`: exists as a single character and in relevant bigrams `oF`, `oT`
- `l -> S`: exists in relevant bigrams `Il` and trigrams `HIl`
- `n -> Y, s -> U, q -> L, u -> A, t -> G`: purely because we know `HERE IS n0sR Fqut` now implies `HERE IS YOUR FLAG` :P
- `w -> D`: based on `ALREAwY` and `SAIw`
- `y -> P`: based on `yERIODS`, `DROyyED`, and `UyyER`
- `h -> B`: based on `hESIDES` and `hUT`
- `b -> N`: based on `HOLDIbG` and `SEPARATIOb`
- `m -> x`: based on `BOm`, `EmxUISITE`, `ESSEm`
- `g -> W`: based on `BETgEEN` and `gAS`
- `p -> C`: based on `EFFEpT` and `EApH`
- `d -> M`: based on `dORE`, `dINUTE`
- `a -> K`: based on `BACa`, `DECa`, `LIaE`
- `z -> Q`: based on `FREzUENCY`
- `k -> Z`: based on `LAkILY`

The final script will give us the flag!

```bash
cat substitutions.txt | sed 's/i/T/g; s/j/H/g; s/f/E/g; s/v/R/g; s/c/O/g; s/e/V/g; s/x/F/g; s/o/I/g; s/l/S/g; s/n/Y/g; s/s/U/g; s/q/L/g; s/u/A/g; s/t/G/g; s/w/D/g; s/y/P/g; s/h/B/g; s/b/N/g; s/m/X/g; s/g/W/g; s/p/C/g; s/d/M/g; s/a/K/g; s/z/Q/g; s/k/Z/g;'
```

```txt
-------------------------------------------------------------------------------
CONGRATS HERE IS YOUR FLAG - FREQUENCY_IS_C_OVER_LAMBDA_MUPGPENNOD
-------------------------------------------------------------------------------
BETWEEN US THERE WAS, AS I HAVE ALREADY SAID SOMEWHERE, THE BOND OF THE SEA. BESIDES HOLDING OUR HEARTS TOGETHER THROUGH LONG PERIODS OF SEPARATION, IT HAD THE EFFECT OF MAKING US TOLERANT OF EACH OTHER'S YARNSAND EVEN CONVICTIONS. THE LAWYERTHE BEST OF OLD FELLOWSHAD, BECAUSE OF HIS MANY YEARS AND MANY VIRTUES, THE ONLY CUSHION ON DECK, AND WAS LYING ON THE ONLY RUG. THE ACCOUNTANT HAD BROUGHT OUT ALREADY A BOX OF DOMINOES, AND WAS TOYING ARCHITECTURALLY WITH THE BONES. MARLOW SAT CROSS-LEGGED RIGHT AFT, LEANING AGAINST THE MIZZEN-MAST. HE HAD SUNKEN CHEEKS, A YELLOW COMPLEXION, A STRAIGHT BACK, AN ASCETIC ASPECT, AND, WITH HIS ARMS DROPPED, THE PALMS OF HANDS OUTWARDS, RESEMBLED AN IDOL. THE DIRECTOR, SATISFIED THE ANCHOR HAD GOOD HOLD, MADE HIS WAY AFT AND SAT DOWN AMONGST US. WE EXCHANGED A FEW WORDS LAZILY. AFTERWARDS THERE WAS SILENCE ON BOARD THE YACHT. FOR SOME REASON OR OTHER WE DID NOT BEGIN THAT GAME OF DOMINOES. WE FELT MEDITATIVE, AND FIT FOR NOTHING BUT PLACID STARING. THE DAY WAS ENDING IN A SERENITY OF STILL AND EXQUISITE BRILLIANCE. THE WATER SHONE PACIFICALLY; THE SKY, WITHOUT A SPECK, WAS A BENIGN IMMENSITY OF UNSTAINED LIGHT; THE VERY MIST ON THE ESSEX MARSH WAS LIKE A GAUZY AND RADIANT FABRIC, HUNG FROM THE WOODED RISES INLAND, AND DRAPING THE LOW SHORES IN DIAPHANOUS FOLDS. ONLY THE GLOOM TO THE WEST, BROODING OVER THE UPPER REACHES, BECAME MORE SOMBRE EVERY MINUTE, AS IF ANGERED BY THE APPROACH OF THE SUN.
```

## Irish-Name-Repo 2

#web-exploits #350pt #curl #sql-injection

> There is a website running at https://2019shell1.picoctf.com/problem/7411/ (link). Someone has bypassed the login before, and now it's being strengthened. Try to see if you can still login! or http://2019shell1.picoctf.com:7411
>
> `picoCTF{m0R3_SQL_plz_c1c3dff7}`

- Similar to the [Irish-Name-Repo 1](#irish-name-repo-1) problem, try `'OR 1=1--` in the `username` field.
- We see that the developer has fixed the issue and detected our SQL injection, and threw us a `SQLi detected.` message :(
- We notice that we can send `debug=1` in the request body and it will output us the SQL error!
- Build the correct filter condition by injecting the at the `name` field and before the `password` field to capture the flag.
- Successfully logged in :)

```bash
curl https://2019shell1.picoctf.com/problem/7411/login.php -d "username='admin--&debug=1"
curl https://2019shell1.picoctf.com/problem/7411/login.php -d "username=admin'--&debug=1"
```

## Empire1 #400pt

#web-exploits #400pt #unsolved

> Psst, Agent 513, now that you're an employee of Evil Empire Co., try to get their secrets off the company website. https://2019shell1.picoctf.com/problem/4155/ (link) Can you first find the secret code they assigned to you? or http://2019shell1.picoctf.com:4155
>
> ``

## Irish-Name-Repo 3

#web-exploits #400pt #unsolved

> There is a secure website running at https://2019shell1.picoctf.com/problem/45112/ (link) or http://2019shell1.picoctf.com:45112. Try to see if you can login as admin!
>
> ``

## JaWT Scratchpad

#web-exploits #400pt #unsolved

> Check the admin scratchpad! https://2019shell1.picoctf.com/problem/12283/ or http://2019shell1.picoctf.com:12283
>
> ``

## Java Script Kiddie

#web-exploits #400pt #unsolved

> The image link appears broken... https://2019shell1.picoctf.com/problem/57738 or http://2019shell1.picoctf.com:57738
>
> ``

## cereal hacker 1

#web-exploits #400pt #unsolved

> Login as admin. https://2019shell1.picoctf.com/problem/21885/ or http://2019shell1.picoctf.com:21885
>
> ``

## Ghost_Diary

#binary-exploits #500pt #unsolved

> Try writing in this ghost diary. Its also found in /problems/ghost-diary_6_5a9aa6b551e71294dfdc06646d2d7104 on the shell server.
>
> ``
