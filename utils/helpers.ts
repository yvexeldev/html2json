import type { BusinessInfo } from "../types";
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

export function saveJsonToFile(
    json: BusinessInfo | object,
    filePath: string
): void {
    const jsonString = JSON.stringify(json, null, 2);
    fs.writeFileSync(filePath, jsonString, "utf-8");
}

export function extractBusinessInfo(html: string): {
    businessData: BusinessInfo;
    default: object;
} {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const getValue = (label: string): string => {
        const row = Array.from(document.querySelectorAll("tr")).find((tr) =>
            tr.textContent?.includes(label)
        );
        return row?.querySelector(".td_border")?.textContent?.trim() || "";
    };

    const founders = Array.from(document.querySelectorAll("tr"))
        .filter((tr) => tr.textContent?.includes("%"))
        .map((tr) => {
            const cells = tr.querySelectorAll(".td_border");
            return {
                name:
                    cells[0].textContent?.trim().replace(/^\d+\.\s*/, "") || "",
                share: cells[1].textContent?.trim() || "",
            };
        });

    return {
        businessData: {
            inn: { param: "ИНН", value: getValue("ИНН:") },
            registratorOrgan: {
                param: "Регистрирующий орган:",
                value: getValue("Регистрирующий орган:"),
            },
            registrationDate: {
                param: "Дата регистрации:",
                value: getValue("Дата регистрации"),
            },
            registrationNumber: {
                param: "Номер регистрации",
                value: getValue("Номер регистрации:"),
            },
            companyName: {
                param: "Наименование юридического лица",
                value: getValue("Наименование юридического лица:"),
            },
            activityType: {
                param: "Код ОКЭД (Вид(ы) осуществляемой деятельности):",
                value: getValue("Код ОКЭД"),
            },
            sooGuType: {
                param: "Код СООГУ:",
                value: getValue("Код СООГУ:"),
            },
            isBelongSmallBusiness: {
                param: "Принадлежность к cубъектам малого предпринимательства:",
                value: getValue(
                    "Принадлежность к cубъектам малого предпринимательства:"
                ),
            },
            status: {
                param: "Состояние активности",
                value: getValue("Состояние активности:"),
            },
            authorizedCapital: {
                param: "Уставный фонд",
                value: getValue("Уставный фонд:"),
            },
            founders: {
                param: "Информация об учредителях и их доле в уставном фонде",
                value: founders,
            },
            contacts: {
                email: {
                    param: "Адрес электронной почты",
                    value: getValue("Адрес электронной почты:"),
                },
                phone: {
                    param: "Контактные телефоны",
                    value: getValue("Контактные телефоны:"),
                },
                address: {
                    param: "Улица, тупик, дом",
                    value: getValue("Улица, тупик, дом:"),
                },
            },
            soaToCode: {
                param: "Код СОАТО:",
                value: getValue("Код СОАТО:"),
            },
            director: {
                param: "Имя руководителя",
                value: getValue("Имя руководителя:"),
            },
            dataDate: {
                param: "Дата данных",
                value:
                    document
                        .querySelector('table[width="720"]')
                        ?.textContent?.trim() || "",
            },
        },
        default: parseDefault(html),
    };
}

export function generateDefaultOutputPath(
    inputPath: string,
    isDefault: boolean = false
): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    inputPath = isDefault ? "default" : inputPath;
    const dir = path.dirname(inputPath);
    const filename = path.basename(inputPath, path.extname(inputPath));

    fs.existsSync(path.join(dir, "output")) ||
        fs.mkdirSync(path.join(dir, "output"));
    return path.join(dir, "output", `${filename}-${timestamp}.json`);
}

function parseDefault(html: string) {
    const dom = new JSDOM(html);
    
    function elementToObject(element: Element) {
      const obj: any = {
        tag: element.tagName.toLowerCase(),
        text: element.textContent?.trim() || '',
      };
  
      // Get attributes
      if (element.attributes.length) {
        obj.attributes = {};
        Array.from(element.attributes).forEach(attr => {
          obj.attributes[attr.name] = attr.value;
        });
      }
  
      // Get children
      if (element.children.length) {
        obj.children = Array.from(element.children).map(elementToObject);
      }
  
      return obj;
    }
  
    return elementToObject(dom.window.document.body);
  }