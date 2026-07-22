import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportButtons({ transactions }) {

    const exportPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("FinTrack AI Report", 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [["Category", "Amount", "Type", "Date", "Description"]],
            body: transactions.map((t) => [
                t.category,
                `₹${t.amount}`,
                t.type,
                t.date,
                t.description,
            ]),
        });

        doc.save("FinTrackAI_Report.pdf");
    };

    const exportCSV = () => {

        const headers = [
            "Category",
            "Amount",
            "Type",
            "Date",
            "Description",
        ];

        const rows = transactions.map((t) => [
            t.category,
            t.amount,
            t.type,
            t.date,
            t.description,
        ]);

        const csvContent =
            [headers, ...rows]
                .map((row) => row.join(","))
                .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "FinTrackAI_Report.csv";

        link.click();

        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="export-buttons">

            <button
                className="pdf-btn"
                onClick={exportPDF}
            >
                📄 Export PDF
            </button>

            <button
                className="csv-btn"
                onClick={exportCSV}
            >
                📊 Export CSV
            </button>

        </div>
    );
}

export default ExportButtons;