# Stos i RPN
Klasa ``Stack`` implementująca ideę stosów napisów z następującymi metodami publicznymi:
- ``push`` wkłada jeden element na stos
- ``pop`` zdejmuje jeden element ze stosu i oddaje wartość tego elementu; co się ma dziać gdy, ``pop`` próbuje 
    zdjąc element z pustego stosu?
- ``peek`` podobnie jak ``pop`` oddaje wartość elementu na szczycie stosu ale go nie zdejmuje; 
    podobny problem z pustym stosem co w przypadku ``pop``.

Klasa ``RPN`` wylicza wyrażenia arytmetyczne zapisane w [Odwrotnej Notacji Polskiej](https://pl.wikipedia.org/wiki/Odwrotna_notacja_polska).
Założenia:
- wyrażenia są ciągami znaków
- program umożliwia wyliczanie wyrażeń złożonych z liczb całkowitych i operacji binarnych takich jak ``+``, ``-`` czy ``*``.
- do implementacji wykorzystuje klasę ``Stack``


