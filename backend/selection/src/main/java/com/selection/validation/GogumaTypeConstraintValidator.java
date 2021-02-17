package com.selection.validation;

import com.selection.domain.article.GogumaType;
import java.util.Objects;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class GogumaTypeConstraintValidator implements ConstraintValidator<GogumaTypeConstraint, String> {

    private GogumaTypeConstraint annotation;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        for(GogumaType gogumaType : GogumaType.values()) {
            if (gogumaType.toString().equals(value)) return true;
        }
        return false;
    }
}