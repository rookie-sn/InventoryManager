import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AddItemForm({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({name: '', category: 'Electronics', stock: '', reorderPoint: '5', price: '',
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {if (isOpen) 
    {setFormData({ name: '', category: 'Electronics', stock: '', reorderPoint: '5', price: '', });
    setErrors({});
    }}, [isOpen]);
  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    const stockVal = parseInt(formData.stock, 10);
    if (isNaN(stockVal) || stockVal < 0) {
      newErrors.stock = 'Initial stock must be a non-negative number.';
    }
    const reorderVal = parseInt(formData.reorderPoint, 10); //reorder value validator
    if (isNaN(reorderVal) || reorderVal < 0) {
      newErrors.reorderPoint = 'Reorder point must be a non-negative number.';
    }
    const priceVal = parseFloat(formData.price);
    if (isNaN(priceVal) || priceVal <= 0) {
      newErrors.price = 'Price must be a positive decimal value.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd({name: formData.name.trim(), category: formData.category, stock: parseInt(formData.stock, 10), reorderPoint: parseInt(formData.reorderPoint, 10),
      price: parseFloat(formData.price),
    });
    onClose();
  };
