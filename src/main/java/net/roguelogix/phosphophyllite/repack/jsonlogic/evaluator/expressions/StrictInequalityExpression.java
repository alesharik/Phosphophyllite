package net.roguelogix.phosphophyllite.repack.jsonlogic.evaluator.expressions;

import net.roguelogix.phosphophyllite.repack.jsonlogic.ast.JsonLogicArray;
import net.roguelogix.phosphophyllite.repack.jsonlogic.evaluator.JsonLogicEvaluationException;
import net.roguelogix.phosphophyllite.repack.jsonlogic.evaluator.JsonLogicEvaluator;
import net.roguelogix.phosphophyllite.repack.jsonlogic.evaluator.JsonLogicExpression;

public class StrictInequalityExpression implements JsonLogicExpression {
  public static final StrictInequalityExpression INSTANCE =
    new StrictInequalityExpression(StrictEqualityExpression.INSTANCE);

  private final StrictEqualityExpression delegate;

  private StrictInequalityExpression(StrictEqualityExpression delegate) {
    this.delegate = delegate;
  }

  @Override
  public String key() {
    return "!==";
  }

  @Override
  public Object evaluate(JsonLogicEvaluator evaluator, JsonLogicArray arguments, Object data)
    throws JsonLogicEvaluationException {
    boolean result = (boolean) delegate.evaluate(evaluator, arguments, data);

    return !result;
  }
}