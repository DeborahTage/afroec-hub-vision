import csv

def escape_tex(text):
    if not text:
        return ""
    chars = {
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '^': r'\textasciicircum{}',
        '\\': r'\textbackslash{}',
    }
    for k, v in chars.items():
        text = text.replace(k, v)
    return text

def main():
    input_file = '/home/kalilinux/Downloads/applications-export.csv'
    output_file = '/home/kalilinux/Downloads/Ambassadors_Registration.tex'

    data = []
    with open(input_file, mode='r', encoding='utf-8') as f:
        reader = csv.reader(f)
        try:
            raw_headers = next(reader)
        except StopIteration:
            return
            
        type_idx = raw_headers.index('type')
        name_idx = raw_headers.index('fullName')
        email_idx = raw_headers.index('email')
        phone_idx = raw_headers.index('phone')
        status_idx = raw_headers.index('status')
        city_idx = raw_headers.index('city')
        date_idx = raw_headers.index('createdAt')
            
        for row in reader:
            if row and row[type_idx].strip() == 'AMBASSADOR':
                date_str = row[date_idx].split('T')[0] if 'T' in row[date_idx] else row[date_idx][:10]
                data.append([
                    escape_tex(row[name_idx]),
                    escape_tex(row[email_idx]),
                    escape_tex(row[phone_idx]),
                    escape_tex(row[status_idx]),
                    escape_tex(row[city_idx]),
                    escape_tex(date_str)
                ])

    tex_content = r"""\documentclass[10pt,landscape,a4paper]{article}
\usepackage[margin=1in]{geometry}
\usepackage{longtable}

\title{\textbf{Afroec Hub - Ambassador Registrations}}
\date{}
\begin{document}
\maketitle

\begin{center}
\begin{longtable}{p{4cm} p{5cm} p{3.5cm} p{2cm} p{3cm} p{2.5cm}}
\hline
\textbf{Full Name} & \textbf{Email} & \textbf{Phone} & \textbf{Status} & \textbf{City} & \textbf{Date} \\
\hline
\endhead
"""
    for row in data:
        tex_content += " & ".join(row) + r" \\" + "\n\\hline\n"

    tex_content += r"""\end{longtable}
\end{center}
\end{document}
"""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(tex_content)
    print("generated: " + output_file)

if __name__ == '__main__':
    main()
