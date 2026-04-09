+++
title = "Rollio, beccheggio, imbardata"
description = "I tre assi di rotazione di qualsiasi corpo rigido in movimento — inclinare, annuire, girare — e perché tre parole nautiche hanno finito per governare metà del mondo moderno."
date = 2026-01-30

[taxonomies]
categories = ["Parola del giorno"]
tags = ["parola del giorno", "fisica", "aviazione", "robotica"]

[extra]
toc = false
+++

**Rollio** (_roll_), **beccheggio** (_pitch_) e **imbardata** (_yaw_) sono i tre
assi di rotazione di un corpo rigido in movimento. Descrivono ogni modo
possibile in cui un aereo, una barca, un drone, un veicolo spaziale, una
telecamera o la tua testa possono ruotare rispetto al proprio centro di massa.
La traslazione (il movimento nello spazio) dà tre gradi di libertà — su/giù,
destra/sinistra, avanti/indietro — e rollio, beccheggio e imbardata danno gli
altri tre, per un totale di sei.

- **Rollio** è la rotazione attorno all'asse longitudinale (da prua a poppa).
  Pensa a inclinare la testa verso la spalla, o a un aereo che si inclina in
  virata. Se sei una nave, il rollio è quello che fa il mal di mare.
- **Beccheggio** è la rotazione attorno all'asse trasversale (da sinistra a
  destra). Annuire con la testa, un aereo che cabra o picchia, uno skateboard
  che fa un ollie.
- **Imbardata** è la rotazione attorno all'asse verticale. Scuotere la testa in
  segno di diniego, un'auto che gira a un incrocio, una nave che cambia rotta
  senza inclinarsi.

## Da dove vengono le parole

Il lessico arriva dall'ingegneria nautica e aeronautica, dove dare un nome
preciso a questi tre assi era una questione di sopravvivenza. I termini _yaw_ e
_pitch_ apparivano nella marineria molto prima che esistessero gli aerei —
l'inglese antico _ġeagian_ e il medio inglese _yawen_ significavano "deviare da
una rotta rettilinea", che è esattamente quello che fa una nave quando un'onda
la colpisce di traverso. _Pitch_ richiama il beccheggio della prua che sale e
scende sul mare mosso. _Roll_ si spiega da solo a chiunque abbia provato a
dormire su una piccola barca in mare aperto.

I pionieri dell'aviazione presero queste parole di peso, perché i problemi erano
analoghi e la matematica si trasferiva direttamente. Dal punto di vista della
dinamica rotazionale, un aereo è solo un sottomarino in un fluido più sottile.

## Dove vivono oggi

Oggi la triade è ovunque. I flight controller dei quadricotteri fanno girare
loop PID indipendenti su ciascuno dei tre assi. I game engine usano gli angoli
di Eulero (di solito nell'ordine imbardata-beccheggio-rollio) per orientare
telecamere e personaggi. Le IMU nei telefoni, nei controller di gioco e nei
visori AR misurano le tre rotazioni usando minuscoli giroscopi MEMS. La robotica
li usa per descrivere l'orientamento dell'end effector alla punta di un braccio.
I direttori della fotografia li usano per descrivere cosa fa un gimbal.

Il **gimbal lock** — la perdita di un grado di libertà quando due dei tre assi
finiscono per allinearsi — è la famosa patologia di questa rappresentazione. È
il motivo per cui gli astronauti di Apollo 11 si dovettero preoccupare di un
certo angolo, e il motivo per cui i sistemi moderni usano spesso i quaternioni
sotto il cofano. Ma rollio, beccheggio e imbardata restano le parole che si
dicono ad alta voce, perché si mappano in modo limpido sull'intuizione fisica:
inclinare, annuire, girare. Tre verbi che coprono ogni rotazione di ogni cosa
rigida nell'universo.
