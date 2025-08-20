import Image from "next/image";

import rispo1 from "@/assets/images/rispo1.webp";
import rispo2 from "@/assets/images/rispo2.webp";

export default function AboutContent() {
    return (
        <div className="flex flex-col gap-4 px-2 lg:px-4 pt-2 lg:pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 p-4">
                <div className="relative flex-1 flex flex-col h-[500px]">
                    <Image src={rispo1} alt="Image 3" fill className="object-cover grayscale" />
                </div>
                <div className="relative flex-1 flex flex-col h-[500px]">
                    <Image src={rispo2} alt="Image 9" fill className="object-cover grayscale" />
                </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
                <p>
                    È cresciuto in un vivaio fertile, l’estro creativo di Giordano Rispo. Lui è figlio d’arte, ma non lo dice per timidezza, pudore, quasi che affermarlo potesse sminuire il suo valore quando si presenta a qualcuno. Si pensa sia tutto facile, per un ragazzo il cui padre è un attore affermato, invece spesso accade il contrario. Un genitore così fa ombra, e quell’ombra non sempre ripara, malgrado di certo abbia voluto farlo. Così, lui, crescendo, deve avere imparato a impegnarsi il doppio, schivare chi lo sottovaluta affidandosi ai luoghi comuni, a studiare, sperimentare, fare chiarezza nella confusione per scoprire una sua voce unica e originale, proprio influenzato da tutta quell’arte che lo ha circondato fin da bambino. Il ritratto è la cifra di questo giovane autore dallo sguardo acuto, empatico, che sa catturare l’essenza dei soggetti, in un portfolio che integra con scene di strada armoniche e ben composte, declinate in tagli di luce che possono sorprendere. Il bianco e nero è il suo linguaggio, che usa per evocare sensazioni, atmosfere oniriche o minimaliste, mettendo in risalto espressioni, luci e ombre, per creare un impatto visivo decisamente forte. Inevitabile trovare analogie con la poetica dei film di Frank Capra, Fellini e Billy Wilder, contaminata ovviamente da influenze più contemporanee.
                </p>
                <p>
                    Del mondo che incontra ama i volti, inquadra quelli familiari congelando in uno scatto istanti che sono affetti, memoria, rapporti indissolubili, e riporta questa sua capacità di interazione anche nelle relazioni casuali, quando gira per le strade di Napoli, la sua città, o viaggia lontano, tonando con dei close up come quelli che costituiscono questo portfolio africano. Ricordano i primi piani di Eric Lafforgue, di Pieter Hugo o i “Ritratti di Bamako” di Seydou Keita, eppure sono per lui ancora sperimentazioni che, col tempo, lo condurranno alla sua unicità. Sono sufficientemente certa che Giordano Rispo non sia (e non sarà) solo un fotografo, il fuoco e la curiosità che lo pervadono lo spingono a esplorare in diverse direzioni: la comunicazione, la regia, la recitazione, ma la fotografia è un linguaggio che di certo gli si addice e che lo guiderà, trasformandosi in qualcosa di importante, fondamentale, per il suo percorso.
                </p>
            </div>
        </div>
    );
}
