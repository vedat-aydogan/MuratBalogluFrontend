export class Menu {
  name: string;
  actions: Action[];
}

export class Action {
  actionType: string;
  definition: string;
  httpType: string;
  code: string;
}

//Yukaridaki yapı ile aynıdır.
// export class Menu {
//   name: string;
//   actions: {
//     actionType: string;
//     definition: string;
//     httpType: string;
//     code: string;
//   }[];
// }