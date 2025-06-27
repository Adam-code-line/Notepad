document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.delbtn').forEach(button => {
        button.addEventListener('click', function(event) {
            if (!confirm('确定要删除这条记录吗？')) {
                event.preventDefault();
            }
        });
    });
});