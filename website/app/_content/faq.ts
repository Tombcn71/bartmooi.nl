// Veelgestelde vragen. Alle antwoorden komen uit de teksten van de site en de artikelen zelf; er is niets bijgevoegd.
export type Vraag = { v: string; a: string };

export const faqDiensten: Vraag[] = [
  { v: "Welke kozijnen levert BartMooi?", a: "BartMooi levert kunststof en aluminium kozijnen op maat, met HR++ en HR+++ beglazing voor optimale warmte- en geluidsisolatie. De kozijnen verhogen het wooncomfort en verminderen warmteverlies." },
  { v: "Welke andere producten levert BartMooi?", a: "Naast kozijnen levert BartMooi buitendeuren en binnendeuren, schuifpuien en harmonicadeuren, rolluiken, binnenzonwering en horren en aluminium veranda’s, allemaal volledig op maat gemaakt en professioneel gemonteerd." },
  { v: "Is de inmeting gratis?", a: "Ja. BartMooi komt persoonlijk bij u langs om de situatie te bekijken, uw wensen te bespreken en alles nauwkeurig in te meten. Dit eerste gesprek is altijd geheel vrijblijvend." },
  { v: "Hoe werkt het proces van BartMooi?", a: "In vijf stappen: gratis inmeting en advies, persoonlijke offerte, productie op maat, professionele montage en oplevering, waarbij alles samen met u wordt nagelopen." },
  { v: "Voor wie werkt BartMooi?", a: "BartMooi werkt voor particulieren en VvE’s in heel Nederland, vanuit het kantoor in Den Haag." },
];

export const faqSubsidie: Vraag[] = [
  { v: "Wie komt in aanmerking voor subsidie op nieuwe kozijnen en deuren?", a: "Huiseigenaren, VvE’s en particulieren die hun woning verduurzamen kunnen in aanmerking komen voor subsidieregelingen in Nederland. De voorwaarden verschillen per regeling." },
  { v: "Hoe helpt BartMooi bij de subsidieaanvraag?", a: "BartMooi adviseert welke oplossingen voldoen aan de subsidievoorwaarden, informeert welke documenten nodig zijn voor de aanvraag en levert de technische specificaties die vereist zijn voor subsidie." },
  { v: "Waarom is er subsidie voor HR++ en HR+++ glas?", a: "Subsidies zijn bedoeld om de energieprestaties van woningen te verbeteren. Kozijnen met HR++ of HR+++ beglazing verminderen warmteverlies aanzienlijk, waardoor u een deel van uw investering kunt terugkrijgen." },
  { v: "Welke bedragen en voorwaarden gelden er?", a: "De actuele bedragen en voorwaarden staan bij RVO (ISDE-regeling) en kunnen wijzigen. In ons artikel over subsidies voor kozijnen en deuren in Den Haag staat een rekenvoorbeeld; controleer altijd de officiële regels voordat u een aanvraag doet." },
];

export const faqPosts: Record<string, Vraag[]> = {
  "subsidies-kozijnen-en-deuren": [
    { v: "Welke subsidie is er voor isolatieglas?", a: "De belangrijkste landelijke regeling voor glasisolatie in bestaande woningen is de ISDE (Investeringssubsidie duurzame energie en energiebesparing). Vanaf 2025 krijgt triple-glas (HR+++) aanzienlijk meer subsidie per m² dan HR++." },
    { v: "Aan welke voorwaarden moet je voldoen voor subsidie op glas?", a: "Er geldt een minimaal te isoleren oppervlak (in 2025 doorgaans 3 m² bij nieuwe plaatsing) en meestal een maximum aan subsidie-m² per aanvraag. De factuur moet de juiste specificaties vermelden, zoals m², U-waarde en meldcode. Controleer de actuele regels bij RVO." },
    { v: "Hoeveel subsidie krijg je voor 25 m² triple-glas?", a: "In het rekenvoorbeeld van dit artikel: indicatief €111 per m² voor triple-glas, dus 25 × €111 = €2.775. Dat is een indicatie op basis van het 2025-tarief; controleer de actuele bedragen bij RVO." },
    { v: "Hoeveel energie bespaar je met triple-glas?", a: "Dat hangt af van woningtype, bestaande isolatie, oriëntatie en installaties. Als ruwe indicatie noemt het artikel 20–40 kWh per m² per jaar, dus 500–1.000 kWh voor 25 m², oftewel bij €0,40 per kWh ongeveer €200 tot €400 per jaar." },
    { v: "Verbetert triple-glas ook de geluidsisolatie?", a: "Ja. Driedubbel glas in combinatie met goed afsluitende kozijnen kan de geluidsisolatie verbeteren (het artikel noemt 2–6 dB en in de praktijk vaak meer, afhankelijk van glasopbouw en kieren). Vraag voor exacte waarden naar de R-waarden in de offerte." },
  ],
  "zoveel-bespaar-je-met-energiezuinige-kozijnen-laten-plaatsen": [
    { v: "Wat is HR+++ glas?", a: "HR+++ glas bestaat uit drie glaslagen met isolerende ruimtes ertussen. Daardoor blijft warmte binnen en dringt kou nauwelijks door het raam; het glas voelt bij koud weer aangenaam aan." },
    { v: "Hoeveel bespaar je met nieuwe kozijnen met HR+++ glas?", a: "Voor een gemiddelde tussenwoning noemt BartMooi een lager gasverbruik van 250 tot 450 m³ per jaar. Bij een gasprijs van ongeveer €1,45 per m³ is dat een besparing van circa €360 tot €650 per jaar." },
    { v: "Kunststof of aluminium kozijnen: welke past bij jouw woning?", a: "Kunststof kozijnen isoleren sterk, zijn onderhoudsarm en zijn leverbaar in moderne en klassieke kleuren en structuren. Aluminium kozijnen presteren vergelijkbaar, maar hebben een slankere vormgeving die goed werkt bij grote raampartijen zoals schuifpuien en veranda’s." },
    { v: "Waarom gaat er in oudere woningen zoveel warmte verloren?", a: "In veel oudere woningen ontsnapt warmte via het glas en de kozijnranden. Energiezuinige kozijnen houden die warmte beter vast, waardoor het huis constanter van temperatuur is en de verwarming minder hard hoeft te draaien." },
  ],
  "https-bartmooi-nl-kozijnen-in-den-haag": [
    { v: "Wat is het verschil tussen kunststof, aluminium en houten kozijnen?", a: "Hout: veel onderhoud (schilderwerk), 20–30 jaar levensduur, gemiddelde isolatie en hoge kosten. Kunststof: weinig onderhoud, 40+ jaar, zeer goede isolatie en betaalbaar. Aluminium: onderhoudsarm, 50+ jaar, goede isolatie, iets duurder en modern en strak." },
    { v: "Hoe lang gaan kunststof en aluminium kozijnen mee?", a: "Volgens BartMooi gaan kunststof kozijnen vaak 40 jaar of langer mee en aluminium kozijnen 50 jaar of langer." },
    { v: "Moet je kunststof kozijnen schilderen?", a: "Nee. Kunststof kozijnen hoef je nooit te schilderen. Af en toe schoonmaken met een doekje is genoeg." },
    { v: "Welke kozijnen passen bij welke woning?", a: "Voor oude herenhuizen passen kunststof kozijnen met houtlookprofiel, die de klassieke uitstraling behouden. Voor appartementen zorgen aluminium kozijnen voor veel licht en een moderne look. Bij nieuwbouw zijn beide opties geschikt, afhankelijk van stijl en budget." },
  ],
  "onderhoudstips-kozijnen-en-deuren-verleng-de-levensduur": [
    { v: "Hoe maak je kunststof kozijnen schoon?", a: "Gebruik lauwwarm water met een mild schoonmaakmiddel en een zachte doek of spons. Neem ook de randen, hoeken en aansluitingen mee, want daar hoopt vuil zich vaak ongemerkt op." },
    { v: "Hoe onderhoud je deuren?", a: "Maak het deurblad regelmatig schoon, controleer het hang- en sluitwerk (zitten de schroeven nog vast?), smeer bewegende onderdelen licht en houd de afdichtingsrubbers schoon en flexibel, zodat de isolerende werking optimaal blijft." },
    { v: "Hoe maak je rolluiken schoon?", a: "Maak ze schoon met water en een mild reinigingsmiddel en controleer of de geleiders vrij zijn van vuil en stof. Voor de binnenkant rol je het rolluik volledig uit en werk je stapsgewijs; voor de buitenkant heb je mogelijk een ladder nodig." },
    { v: "Hoe onderhoud je jaloezieën en rolgordijnen?", a: "Maak jaloezieën regelmatig stofvrij met een plumeau of zachte doek; voor hardnekkig vuil volstaat een licht vochtige doek. Rolgordijnen stofzuig je voorzichtig met een zachte borstel. Vermijd agressieve reiniging." },
  ],
};

/** Kort antwoord bovenaan elk artikel (40 tot 60 woorden), samengevat uit het artikel zelf. */
export const kortAntwoord: Record<string, string> = {
  "subsidies-kozijnen-en-deuren": "Voor isolatieglas in bestaande woningen is de ISDE-regeling de belangrijkste landelijke subsidie. Triple-glas (HR+++) levert vanaf 2025 aanzienlijk meer subsidie per m² op dan HR++. Het artikel rekent met een indicatie van €111 per m², dus €2.775 voor 25 m². Controleer altijd de actuele bedragen en voorwaarden bij RVO.",
  "zoveel-bespaar-je-met-energiezuinige-kozijnen-laten-plaatsen": "Nieuwe kozijnen met HR+++ glas houden warmte veel beter vast. Voor een gemiddelde tussenwoning noemt BartMooi een lager gasverbruik van 250 tot 450 m³ per jaar. Bij ongeveer €1,45 per m³ is dat circa €360 tot €650 besparing per jaar. Daarnaast zijn er subsidies in Nederland.",
  "https-bartmooi-nl-kozijnen-in-den-haag": "Kunststof en aluminium kozijnen zijn onderhoudsarm: nooit schilderen. Kunststof gaat vaak 40 jaar of langer mee en aluminium 50 jaar of langer, hout 20 tot 30 jaar. In combinatie met HR+++ glas isoleren ze uitstekend en is in veel gevallen subsidie mogelijk. Zo verdien je de investering sneller terug.",
  "onderhoudstips-kozijnen-en-deuren-verleng-de-levensduur": "Regelmatig onderhoud verlengt de levensduur van kozijnen en deuren. Reinig kunststof kozijnen met lauwwarm water en een mild schoonmaakmiddel, controleer het hang- en sluitwerk, smeer bewegende onderdelen licht en houd afdichtingsrubbers schoon en flexibel. Zo blijven kozijnen en deuren goed sluiten en isoleren.",
};
