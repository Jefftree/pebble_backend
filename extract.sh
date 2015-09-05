unzip -qc herny.pptx ppt/notesSlides/notes* | grep a:t | awk -F '<a:t>' '{print $2}' | awk -F '</a:t>' '{print $1}' | sed -n '1!G;h;$p' > notes.txt
