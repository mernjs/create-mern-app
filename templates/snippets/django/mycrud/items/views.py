from django.shortcuts import render, redirect, get_object_or_404
from .models import Item
from .forms import ItemForm

# Create (Add a new item)
def add_item(request):
    if request.method == "POST":
        form = ItemForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('item_list')
    else:
        form = ItemForm()
    return render(request, 'items/add_item.html', {'form': form})

# Read (List all items)
def item_list(request):
    items = Item.objects.all()
    return render(request, 'items/item_list.html', {'items': items})

# Update (Edit an existing item)
def edit_item(request, id):
    item = get_object_or_404(Item, id=id)
    if request.method == "POST":
        form = ItemForm(request.POST, instance=item)
        if form.is_valid():
            form.save()
            return redirect('item_list')
    else:
        form = ItemForm(instance=item)
    return render(request, 'items/edit_item.html', {'form': form})

# Delete (Remove an item)
def delete_item(request, id):
    item = get_object_or_404(Item, id=id)
    item.delete()
    return redirect('item_list')
