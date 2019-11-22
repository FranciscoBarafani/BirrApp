import t from "tcomb-form-native";
import inputTemplate from "./templates/Input";
import textAreaTemplate from "./templates/TextArea";

export const AddBeerStruct = t.struct({
  name: t.String,
  description: t.String,
  bar: t.String
});

export const AddBeerOptions = {
  fields: {
    name: {
      template: inputTemplate,
      config: {
        placeholder: "Nombre de la Cerveza"
      }
    },
    description: {
      template: textAreaTemplate,
      config: {
        placeholder: "Descripcion de la cerveza"
      }
    },
    bar: {
      template: inputTemplate,
      config: {
        placeholder: "Bar donde se puede tomar",
        iconType: "material-community",
        iconName: "store"
      }
    }
  }
};
