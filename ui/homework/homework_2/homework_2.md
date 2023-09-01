1. You are on Home page, scroll to "Newsletter Subscription" section. Fill email and click Sign Up button.

![subscribe.png](..%2F..%2F..%2Fimages%2Fsubscribe.png)

Then get the following event:

```
{
    "event": "GeneralInteraction",
    "eventCategory": "Footer - D",
    "eventAction": "Newsletter Subscription",
    "eventLabel": "Success",
}
```



2. Go to sunglasses page, click 'My pick' in product card and check that button is clicked.

![mypick.png](..%2F..%2F..%2Fimages%2Fmypick.png)

![mypickactive.png](..%2F..%2F..%2Fimages%2Fmypickactive.png)

Get the following event in Data Layer: 
```
{
    "event": "CategoryInteraction",
    "eventCategory": "Category - D",
    "eventAction": "Product",
    "eventLabel": "Add to Wishlist",
}
```

Then click 'My picks' in header and check product added to wishlist.

![headerpick.png](..%2F..%2F..%2Fimages%2Fheaderpick.png)

![wishlist.png](..%2F..%2F..%2Fimages%2Fwishlist.png)

