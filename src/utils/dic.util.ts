import dicFile from "../dic/data.json";
import { WordSchema } from "../models";
import { sys } from "../configs";

export async function importEnglishDataToDB() {
  const data = dicFile.Sheet1[0];

  const dataAsArray = Object.entries(data);

  let wordCount = 0;

  sys.log("--- IMPORTING DATA --- ");

  for (let i = 0; i < dataAsArray.length; ++i) {
    const word = dataAsArray[i];

    await new WordSchema({
      engVer: word[0].toLowerCase(),
      vieVers: [word[1].toLowerCase()],
      creator: "SYSTEM",
      images: [],
      audios: [],
    }).save();

    wordCount++;
  }

  sys.log("IMPORTED " + wordCount + "WORDS");
}
