
from copy import deepcopy
import re


def extract_all_imports(code):
    # Define the regex pattern to match text inside triple backticks
    pattern = r'import (.*?)\n'
    # Search for the pattern
    match = re.findall(pattern, code)
    imports = []
    if match:
        # extract , separated imports
        for m in match:
            if "as" in m:
                m = m.split(" as ")[0]
            m = m.replace(" ", "")
            imports.extend(m.split(","))
    return imports


with open("core/all_methods.txt", "r") as f:
    ALL_METHODS = f.read()

ALL_METHODS = set(ALL_METHODS.split("\n"))
ALL_METHODS_DICT = {m.upper(): m for m in ALL_METHODS}


def replace_wrong_methods(code):
    imports = extract_all_imports(code)
    for im in imports:
        if im.upper() in ALL_METHODS_DICT:
            code = code.replace(im, ALL_METHODS_DICT[im.upper()])
    return code


def remove_unnecessary_blocks(code):
    code = code.replace("diagram.render()", "")
    return code


def extract_code_block(text):
    # Define the regex pattern to match text inside triple backticks
    pattern = r'```python\n(.*?)\n```'
    # Search for the pattern
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return match.group(1)
    else:
        return None


with open("core/all_diagrams.txt", "r") as f:
    text = f.readlines()

IMPORT_DICT = {}
for line in text:
    if "import" not in line:
        continue
    path = line.split(" import ")[0]
    imports = line.split(" import ")[1].split(", ")
    if path not in IMPORT_DICT:
        IMPORT_DICT[path] = []
    for imp in imports:
        IMPORT_DICT[path].append(imp)


def fix_import_path(code: str) -> str:
    code = code.split("\n")
    code = [line.rstrip() for line in code]
    news_imports = []
    new_code = deepcopy(code)
    for line in code:
        if "import " in line:
            origin_path = line.split(" import ")[0]
            all_imports = line.split("import ")[1].split(", ")
            all_imports = [imp.strip() for imp in all_imports]
            new_code.remove(line)
            for imp in all_imports:
                is_contained = False
                for path, true_imp in IMPORT_DICT.items():
                    if imp in true_imp:
                        news_imports.append(f"{path} import {imp}")
                        is_contained = True
                        break

                if not is_contained:
                    news_imports.append(f"{origin_path} import {imp}")
    new_code = news_imports + new_code
    return "\n".join(new_code)


def shorten_import(code: str) -> str:
    code = code.split("\n")
    new_code = deepcopy(code)
    import_dict = {}
    for line in code:
        line = line.rstrip()
        if "import" not in line:
            continue
        new_code.remove(line)
        path = line.split(" import ")[0]
        imports = line.split(" import ")[1].split(", ")
        if path not in import_dict:
            import_dict[path] = []
        for imp in imports:
            import_dict[path].append(imp)
    shorter_imports = ""
    for path in import_dict:
        shorter_imports += path + " import " + \
            ", ".join(import_dict[path]) + "\n"
    new_code = shorter_imports + "\n" + "\n".join(new_code)
    new_code = new_code.replace("\n\n\n", "\n")
    return new_code

def replace_image_path(code: str) -> str:
    # bedrock_chat = Custom("Bedrock Chat API", "./resources/bedrock.png")
    # -> bedrock_chat = Custom("Bedrock Chat API", "./customs/bedrock.png")
    image_path_pattern = r'Custom\(".*", "(.*?)"\)'
    match = re.search(image_path_pattern, code)
    if match:
        image_path = match.group(1)
        new_image_path = "./resources/" + image_path.split("/")[-1]
        code = code.replace(image_path, new_image_path)
    return code

if __name__ == "__main__":
    code = """bedrock_chat = Custom("Bedrock Chat API", "/tmdsap./sasa/bedrock.png")"""
    print(replace_image_path(code))