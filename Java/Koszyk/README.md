Koszyk potrafi uwzględniać różne promocje, rabaty oraz oferty specjalne, takie jak:
- jeśli wartość zamówienia jest większa niż 300 zł klient otrzymuje 5% zniżki na zakupione towary
- jeśli klient kupi 2 produkty to 3 najtańszy otrzymuje gratis
- jeśli wartość zamówienia przekracza wartość 200 zł klient otrzymuje firmowy kubek gratis
- jednorazowy kupon rabatowy 30% na wybrany produkt
oraz wiele innych jeszcze nieznanych na tym etapie implementacji. 
Promocje mogą się zmieniać w trakcie działania programu, tj. mogą się pojawiać nowe a istniejące mogą znikać.

Towary w koszyku są posegregowane malejąco według ceny, 
a potem według kolejności alfabetycznej nazw produktów. 
Sposób sortowania może produktów może się zmieniać w trakcie działania programu. 

Zaimplementowana logika, operuje na obiektach typu ``Product``, 
która umożliwia:
1. Wyszukiwanie najtańszego/najdroższego produktu w zadanej kolekcji produktów
2. Wyszukiwanie n najtańszych/najdrożyszych produktów w zadanej kolekcji produktów
3. Sortowanie kolekcji produktów po cenie jak i po nazwie
4. Wyliczanie sumy cen wszystkich zadanych produktów
6. Aplikowanie opisanych powyżej rodzajów promocji na zadanej kolekcji produktów w koszyku

Cechy związane z klasą ``Product``:
- kod produktu (code) - String
- nazwa produktu (name) - String
- cena produktu (price) – double
- cena produktu po uwzględnieniu promocji (discountPrice) - double

Projekt wykorzystuje wzorzec projektowy Command