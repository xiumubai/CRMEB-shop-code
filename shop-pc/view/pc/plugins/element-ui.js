import Vue from "vue";
import "@/assets/theme/element-variables.scss";
import {
  Button,
  Form,
  FormItem,
  Input,
  Upload,
  Dialog,
  Pagination,
  Checkbox,
  MessageBox,
  Message,
  Select,
  Option,
  Rate,
  Image,
  Radio,
  RadioGroup,
  InputNumber,
  DatePicker,
  TimeSelect
} from "element-ui";
import locale from "element-ui/lib/locale/lang/en";

const components = [
  Button,
  Form,
  FormItem,
  Input,
  Upload,
  Dialog,
  Radio,
  RadioGroup,
  Pagination,
  Checkbox,
  MessageBox,
  Message,
  Select,
  Option,
  Rate,
  Image,
  InputNumber,
  DatePicker,
  TimeSelect
];

const Element = {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
Vue.use(Element, { locale });
Vue.prototype.$message = Message;
