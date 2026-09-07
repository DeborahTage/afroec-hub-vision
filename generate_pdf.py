import csv
from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

def main():
    input_file = '/home/kalilinux/Downloads/applications-export.csv'
    output_file = '/home/kalilinux/Downloads/Ambassadors_Registration_Data.pdf'

    # Read data
    headers = None
    data = []
    with open(input_file, mode='r', encoding='utf-8') as f:
        reader = csv.reader(f)
        try:
            # Try to read the headers
            raw_headers = next(reader)
        except StopIteration:
            return
        
        # We want to display: fullName, email, phone, status, city, createdAt
        try:
            type_idx = raw_headers.index('type')
            name_idx = raw_headers.index('fullName')
            email_idx = raw_headers.index('email')
            phone_idx = raw_headers.index('phone')
            status_idx = raw_headers.index('status')
            city_idx = raw_headers.index('city')
            date_idx = raw_headers.index('createdAt')
        except ValueError as e:
            print(f"Missing column in header: {e}")
            return
            
        columns = ['Full Name', 'Email', 'Phone', 'Status', 'City', 'Date']
        data.append(columns)
        
        for row in reader:
            if row and row[type_idx].strip() == 'AMBASSADOR':
                date_str = row[date_idx].split('T')[0] if 'T' in row[date_idx] else row[date_idx][:10]
                data.append([
                    row[name_idx],
                    row[email_idx],
                    row[phone_idx],
                    row[status_idx],
                    row[city_idx],
                    date_str
                ])

    # Convert to PDF
    doc = SimpleDocTemplate(output_file, pagesize=landscape(letter))
    elements = []
    
    styles = getSampleStyleSheet()
    elements.append(Paragraph('Afroec Hub - Ambassador Registrations', styles['Title']))
    elements.append(Paragraph(' ', styles['Normal'])) # Spacer
    
    # Create the table
    t = Table(data)
    # Add style
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2e7d32')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f5f5f5')),
        ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
        ('ALIGN', (0, 1), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.whitesmoke, colors.lightgrey])
    ]))
    
    elements.append(t)
    doc.build(elements)
    print(f"Successfully generated PDF: {output_file}")

if __name__ == '__main__':
    main()
